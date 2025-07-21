// src/app/api/submit/route.js
import 'dotenv/config';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// CAMBIO: Se crea una función para generar el HTML del correo directamente
const createEmailHtml = ({ fullName, instagram, height, profileLink }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif; background-color: #f6f9fc; margin: 0; padding: 0; }
      .container { background-color: #ffffff; margin: 40px auto; padding: 20px 0 48px; max-width: 600px; border: 1px solid #f0f0f0; border-radius: 4px; }
      .heading { font-size: 28px; font-weight: bold; margin-top: 32px; text-align: center; color: #333; }
      .paragraph { font-size: 16px; line-height: 24px; text-align: left; padding: 0 40px; color: #555; }
      .info-section { padding: 24px 40px 0 40px; margin-top: 24px; border-top: 1px solid #eee; }
      .info-label { font-size: 14px; color: #5f6368; margin-bottom: 0; }
      .info-value { font-size: 18px; font-weight: bold; margin-top: 0; color: #000; }
      .button-container { margin-top: 32px; text-align: center; }
      .button { background-color: #000000; border-radius: 3px; color: #fff !important; font-size: 16px; text-decoration: none; padding: 12px 24px; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="heading">Nueva Aplicación de Casting</h1>
      <p class="paragraph">Has recibido una nueva aplicación de un modelo.</p>
      <div class="info-section">
        <p class="info-label">Nombre Completo:</p>
        <p class="info-value">${fullName}</p>
        <p class="info-label">Instagram:</p>
        <p class="info-value">@${instagram}</p>
        <p class="info-label">Estatura:</p>
        <p class="info-value">${height} cm</p>
      </div>
      <div class="button-container">
        <a href="${profileLink}" class="button">Ver Perfil Completo y Archivos</a>
      </div>
    </div>
  </body>
  </html>
`;

export async function POST(request) {
  console.log("API Route /api/submit alcanzada.");

  try {
    const applicationData = await request.json();
    console.log("Datos de la aplicación recibidos:", applicationData);

    if (!applicationData || !applicationData.fullName) {
        return NextResponse.json({ success: false, message: 'Datos incompletos.' }, { status: 400 });
    }

    const applicationId = `app_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`;
    console.log(`ID de aplicación generado: ${applicationId}`);

    await kv.set(applicationId, applicationData);
    console.log("¡Guardado en Vercel KV exitosamente!");

    try {
      console.log("Intentando enviar correo de notificación...");
      
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const profileLink = `${baseUrl}/profile/${applicationId}`;

      const emailHtml = createEmailHtml({
          fullName: applicationData.fullName,
          instagram: applicationData.instagram,
          height: applicationData.height,
          profileLink: profileLink,
      });

      const { data, error } = await resend.emails.send({
        from: 'scouting@izmanagementglobal.com',
        to: 'scouting@izcasting.com',
        subject: `Nueva Aplicación de Casting: ${applicationData.fullName}`,
        html: emailHtml,
      });

      if (error) {
        console.error("--- ERROR DEVUELTO POR RESEND ---", error);
      } else {
        console.log("¡Correo aceptado por Resend para envío!", data);
      }

    } catch (emailError) {
      console.error("--- ERROR AL ENVIAR CORREO (TRY/CATCH) ---", emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Aplicación guardada y notificación enviada.',
      applicationId: applicationId
    });

  } catch (error) {
    console.error('--- ERROR EN EL BACKEND ---', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno al procesar la aplicación.'
    }, { status: 500 });
  }
}