import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticateRequest } from '@/lib/auth-middleware';
import { validateMessage, getSystemPrompt } from '@/lib/ai-security';
import { getProductsSummaryForAIByUser } from '@/data/products';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request) {
    // Step 1: Authenticate the request - REQUIRE valid JWT
    const authResult = authenticateRequest(request);
    if (authResult.error) return authResult.error; // Returns 401/403
    const user = authResult.user;

    try {
        const { message, history } = await request.json();

        // Step 2: Validate and sanitize the message (prompt injection check)
        const validation = validateMessage(message);
        if (!validation.valid) {
            return NextResponse.json({
                success: false,
                response: validation.error || 'Invalid message.',
                blocked: true
            });
        }

        // Step 3: Check if API key is configured
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            return NextResponse.json({
                success: true,
                response: "⚠️ **AI Assistant is not configured yet.**\n\nTo enable AI features, please add your Gemini API key to the `.env.local` file:\n\n```\nGEMINI_API_KEY=your_actual_api_key_here\n```\n\nYou can get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).\n\n---\n\n**Demo Response:** I'm SmartStore AI Assistant! Once configured, I can help you find products, compare specifications, and answer questions about your catalog. Try asking me about your products! 🛒",
                demo: true
            });
        }

        // Step 4: Get ONLY this user's products for AI context
        const productData = getProductsSummaryForAIByUser(user.id);
        const systemPrompt = getSystemPrompt(productData);

        // Step 5: Call Gemini API
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Build chat history
        const chatHistory = (history || []).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: chatHistory,
            systemInstruction: systemPrompt,
        });

        const result = await chat.sendMessage(validation.message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            success: true,
            response: text
        });

    } catch (error) {
        console.error('AI Chat Error:', error);

        if (error.message?.includes('API_KEY')) {
            return NextResponse.json({
                success: false,
                response: 'Invalid API key. Please check your Gemini API key configuration.',
                error: 'API_KEY_INVALID'
            });
        }

        return NextResponse.json({
            success: false,
            response: 'I\'m sorry, I encountered an error. Please try again later.',
            error: 'INTERNAL_ERROR'
        }, { status: 500 });
    }
}
