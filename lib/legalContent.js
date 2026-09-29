// Legal content for the Bantrab demo — plain JS module, no runtime deps.
// Shape per spec Key Entities: { id, title, lang, lastUpdated, isDemo, sections[] }
// Chrome (titles) is English; the legal body copy is Spanish per FR-011.

export const LEGAL_LAST_UPDATED = '2026-09-28';

export const LEGAL_DOCUMENTS = {
  terms: {
    id: 'terms',
    title: 'Terms and Conditions',
    lang: 'es',
    lastUpdated: LEGAL_LAST_UPDATED,
    isDemo: true,
    sections: [
      {
        heading: 'Aceptación de los términos',
        paragraphs: [
          'Al acceder o utilizar la plataforma Bantrab (la "Plataforma"), usted acepta quedar vinculado por estos Términos y Condiciones (los "Términos"). Si no está de acuerdo con alguno de estos Términos, no debe utilizar la Plataforma.',
          'Le recomendamos leer estos Términos junto con nuestra Política de Privacidad, que describe cómo tratamos sus datos personales.',
        ],
      },
      {
        heading: 'Descripción del servicio (demostración)',
        paragraphs: [
          'La Plataforma es una aplicación de demostración ("demo") desarrollada con fines ilustrativos y de evaluación técnica. No constituye un servicio real dirigido al público, y las funcionalidades que ofrece pueden cambiar o dejar de estar disponibles en cualquier momento.',
          'Bantrab no garantiza la disponibilidad, la continuidad ni la corrección de la Plataforma en su versión de demostración.',
        ],
      },
      {
        heading: 'Cuenta y seguridad',
        paragraphs: [
          'Para utilizar ciertas funcionalidades de la Plataforma deberá crear una cuenta proporcionando su nombre, correo electrónico y una contraseña. Usted se compromete a proporcionar información veraz y actualizada.',
          'Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda actividad que ocurra bajo su cuenta. Notifique de inmediato cualquier uso no autorizado de su cuenta.',
        ],
      },
      {
        heading: 'Uso aceptable',
        paragraphs: [
          'Usted acepta utilizar la Plataforma únicamente con fines lícitos y de conformidad con estos Términos. Queda prohibido, entre otros: (a) interferir o intentar interferir con el funcionamiento de la Plataforma; (b) acceder sin autorización a sistemas, cuentas o datos de terceros; (c) utilizar la Plataforma para distribuir contenido ilícito, ofensivo o dañino.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'Los elementos de la Plataforma, incluyendo marcas, logotipos, textos, gráficos y código, pertenecen a Bantrab o a sus licenciantes. Estos elementos se proporcionan únicamente para su uso en el contexto de la demostración.',
          'No se le concede ningún derecho de propiedad intelectual sobre la Plataforma salvo el derecho limitado de uso descrito en estos Términos.',
        ],
      },
      {
        heading: 'Datos personales',
        paragraphs: [
          'El tratamiento de sus datos personales se describe en la Política de Privacidad, disponible en la Plataforma. Al crear una cuenta, usted reconoce haber leído y comprendido dicha política.',
        ],
      },
      {
        heading: 'Limitación de responsabilidad',
        paragraphs: [
          'En la máxima medida permitida por la ley aplicable, Bantrab no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la Plataforma.',
          'Este documento es contenido de demostración y no constituye un acuerdo legal vinculante.',
        ],
      },
      {
        heading: 'Cambios a los Términos',
        paragraphs: [
          'Podemos modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor al publicar la versión actualizada en la Plataforma, indicando la fecha de "Última actualización". Le recomendamos revisar estos Términos periódicamente.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: [
          'Si tiene preguntas sobre estos Términos, puede contactarnos a través de los canales de comunicación habilitados en la Plataforma.',
        ],
      },
    ],
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    lang: 'es',
    lastUpdated: LEGAL_LAST_UPDATED,
    isDemo: true,
    sections: [
      {
        heading: 'Responsable del tratamiento',
        paragraphs: [
          'Bantrab (el "Responsable") es responsable del tratamiento de los datos personales recopilados a través de la Plataforma de demostración.',
        ],
      },
      {
        heading: 'Datos que recopilamos',
        paragraphs: [
          'Al crear una cuenta recopilamos: su nombre, su dirección de correo electrónico y una contraseña. La contraseña se almacena únicamente en forma de hash criptográfico, nunca en texto plano.',
          'No recopilamos datos adicionales ni realizamos seguimiento del comportamiento de navegación en esta demostración.',
        ],
      },
      {
        heading: 'Finalidad del tratamiento',
        paragraphs: [
          'Utilizamos sus datos únicamente para: (a) crear y administrar su cuenta de demostración; (b) autenticar su acceso a la Plataforma; (c) responder a consultas relacionadas con el uso de la demo.',
        ],
      },
      {
        heading: 'Conservación de los datos',
        paragraphs: [
          'Conservamos sus datos mientras su cuenta de demostración esté activa o mientras sea necesario para los fines descritos en esta política. Puede solicitar la eliminación de su cuenta y datos en cualquier momento.',
        ],
      },
      {
        heading: 'Terceros',
        paragraphs: [
          'No compartimos, vendemos ni cedemos sus datos personales a terceros. La Plataforma de demostración no utiliza servicios de terceros para el tratamiento de datos.',
        ],
      },
      {
        heading: 'Derechos del titular',
        paragraphs: [
          'Como titular de los datos, usted puede ejercer los derechos de acceso, rectificación, cancelación y oposición respecto de sus datos personales, así como retirar su consentimiento en cualquier momento.',
          'Para ejercer estos derechos, contáctenos a través de los canales habilitados en la Plataforma.',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'La Plataforma utiliza únicamente una cookie de sesión estrictamente necesaria para mantener su sesión autenticada. No utilizamos cookies de análisis, publicidad o seguimiento en esta demostración.',
        ],
      },
      {
        heading: 'Seguridad',
        paragraphs: [
          'Aplicamos medidas técnicas razonables para proteger sus datos, incluyendo el hash de contraseñas y tokens de sesión firmados. Al tratarse de una demostración, no se garantiza un nivel de seguridad de producción.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: [
          'Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos a través de los canales de comunicación habilitados en la Plataforma.',
        ],
      },
    ],
  },
};
