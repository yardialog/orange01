import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Define types
interface LeadData {
  name: string;
  phone: string;
  direction: string;
}

// Helper to validate phone
function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

// Helper to send Telegram notification
async function sendTelegramNotification(data: LeadData): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("Telegram credentials not configured, skipping notification");
    return;
  }

  const directionNames: Record<string, string> = {
    vocal: "Вокал",
    guitar: "Гитара",
    drums: "Барабаны",
    piano: "Фортепиано",
    dj: "DJ",
  };

  const message = `
🎵 Новая заявка с сайта "Оранжевое настроение"

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
🎯 Направление: ${directionNames[data.direction] || "Не выбрано"}
⏰ Дата: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Yekaterinburg" })}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadData;
    const { name, phone, direction } = body;

    // Validate input
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Укажите корректное имя" },
        { status: 400 }
      );
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { error: "Укажите корректный номер телефона" },
        { status: 400 }
      );
    }

    // Save to database
    try {
      await db.lead.create({
        data: {
          name: name.trim(),
          phone,
          direction: direction || null,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    // Send Telegram notification
    await sendTelegramNotification({ name: name.trim(), phone, direction });

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена",
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Ошибка при обработке заявки" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Orange Mood API - Lead Submission Endpoint",
    status: "active",
  });
}
