import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const TermsOfService = () => {
  return (
    <ScrollArea className="h-96 w-full rounded-md border p-4">
      <div className="space-y-6 text-sm">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">📄 Políticas de Uso – Doméstiko</h1>
          <p className="text-muted-foreground">Última actualización: Enero 2025</p>
        </div>

        <section>
          <h2 className="text-lg font-semibold mb-3">🏠 PARA USUARIOS (CLIENTES)</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. ¿Qué es Doméstiko?</h3>
              <p className="text-muted-foreground">
                Doméstiko es una plataforma digital que permite a los hogares encontrar profesionales calificados 
                para servicios como plomería, pintura, electricidad, jardinería, entre otros, de manera rápida, 
                directa y segura.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. ¿Cómo funciona?</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>El usuario ingresa a la app y selecciona el servicio que necesita.</li>
                <li>Visualiza perfiles de profesionales disponibles en su zona.</li>
                <li>Puede contactar y agendar el servicio con el profesional que elija.</li>
                <li>Una vez finalizado el trabajo, podrá calificar al profesional.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Formas de pago disponibles</h3>
              <p className="text-muted-foreground mb-3">
                Al momento de confirmar un servicio, el usuario podrá elegir una de las siguientes opciones:
              </p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-3">
                  <h4 className="font-medium">🔹 Opción 1: Pago directo al profesional</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>El cliente paga el total directamente al profesional.</li>
                    <li>Doméstiko no gestiona el dinero, pero monitorea que el servicio se complete.</li>
                    <li>El profesional deberá reportar el servicio como finalizado en la app.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-3">
                  <h4 className="font-medium">🔹 Opción 2: Pago de garantía mínima en la app</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>El cliente paga un abono mínimo (ej. RD$200) desde la app como garantía.</li>
                    <li>El resto del pago se realiza directamente con el profesional.</li>
                    <li>La garantía queda en poder de Doméstiko como comisión.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-3">
                  <h4 className="font-medium">🔹 Opción 3: Pago total desde la app</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>El cliente paga el 100% del monto del servicio en la app.</li>
                    <li>Doméstiko retiene la comisión y transfiere el restante al profesional una vez marcado como completado.</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-2">
                El cliente puede elegir el método más conveniente. No existen cobros ocultos.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">4. Derechos del usuario</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Acceder a la plataforma sin suscripciones ni pagos fijos.</li>
                <li>Contactar directamente a profesionales disponibles.</li>
                <li>Elegir cómo desea pagar por el servicio.</li>
                <li>Calificar y revisar el historial de los profesionales.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">5. Compromisos del usuario</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Usar la app de forma responsable y con información real.</li>
                <li>No solicitar trabajos falsos ni contactar para fines no relacionados.</li>
                <li>En caso de pagar vía app, seguir el flujo correctamente.</li>
                <li>Ser respetuoso en la comunicación con los profesionales.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">6. Protección del usuario</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Si el pago se realizó dentro de la app, Doméstiko ofrece garantía de cumplimiento.</li>
                <li>En caso de conflictos, el equipo de soporte puede mediar.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">👷 PARA PROFESIONALES</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. ¿Cómo funciona?</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>El profesional se registra gratuitamente en la app.</li>
                <li>Recibe solicitudes de servicio por parte de los clientes.</li>
                <li>Decide si acepta o no el trabajo.</li>
                <li>Luego de completado, debe marcarlo como finalizado para que se procese el pago o la comisión.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Sistema de cobro y pagos</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">💸 Comisiones:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>Doméstiko no cobra membresías ni mensualidades.</li>
                    <li>En lugar de eso, se cobra una comisión por cada trabajo completado.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">🧾 Modalidad de cobro:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>Si el cliente pagó en la app → Doméstiko descuenta automáticamente su comisión y transfiere el restante al profesional.</li>
                    <li>Si el cliente pagó por fuera → Doméstiko cobra la comisión directamente al profesional a través de una tarjeta registrada.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">💳 Tarjeta del profesional:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>Todo profesional debe registrar una tarjeta válida en su cuenta.</li>
                    <li>Desde esa tarjeta se descontarán automáticamente las comisiones cuando el cliente pague por fuera de la app.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Obligaciones del profesional</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Brindar un servicio honesto, puntual y de calidad.</li>
                <li>Marcar como completado cada trabajo finalizado.</li>
                <li>No evadir la plataforma ni realizar acuerdos por fuera sin reportar.</li>
                <li>Mantener sus datos actualizados y su tarjeta activa.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">4. Reputación y visibilidad</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Los profesionales con mejores calificaciones suben en el ranking.</li>
                <li>Los que no reportan trabajos o reciben quejas bajan en visibilidad o pueden ser suspendidos.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">⚠️ Sanciones por mal uso</h2>
          <p className="text-muted-foreground mb-2">
            Doméstiko se reserva el derecho de suspender cuentas que:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Intenten evadir las comisiones.</li>
            <li>No cumplan con los servicios ofrecidos.</li>
            <li>Cometan faltas de respeto o fraudes.</li>
            <li>Reciban múltiples reportes negativos de clientes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">🔒 Privacidad y Seguridad</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Todos los datos financieros y personales son protegidos mediante cifrado y protocolos seguros.</li>
            <li>Las transacciones están respaldadas por plataformas reconocidas.</li>
            <li>Nadie fuera del equipo autorizado de Doméstiko puede acceder a tu información bancaria.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">📩 Contacto</h2>
          <p className="text-muted-foreground">
            Para dudas, soporte o reclamos:<br />
            📧 info.domestiko@gmail.com
          </p>
        </section>
      </div>
    </ScrollArea>
  );
};

export default TermsOfService;