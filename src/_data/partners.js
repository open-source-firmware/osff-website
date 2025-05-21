const partners = [
  {
    "name": "3mdeb",
    "url": "https://www.3mdeb.com",
    "logo": "/assets/images/partner-logos/3mdeb.png"
  },
  {
    "name": "AMD",
    "url": "https://amd.com",
    "logo": "/assets/images/partner-logos/amd.png",
    "logoWidth": "82px",
    "logoHeight": "197px"
  },
  {
    "name": "Eltan",
    "url": "https://www.eltan.com",
    "logo": "/assets/images/partner-logos/eltan_logo.png"
  },
  {
    "name": "Framework",
    "url": "https://frame.work",
    "logo": "/assets/images/partner-logos/framework_logo.svg"
  },
  {
    "name": "Google",
    "url": "https://www.google.com",
    "logo": "/assets/images/partner-logos/google-logo.svg"
  },
  {
    "name": "MiTAC Computing",
    "url": "https://www.mitaccomputing.com/",
    "logo": "/assets/images/partner-logos/mitac.png"
  },
  {
    "name": "Nitrokey",
    "url": "https://www.nitrokey.com",
    "logo": "/assets/images/partner-logos/nitrokey_logo.svg"
  },
  {
    "name": "NovaCustom",
    "url": "https://www.novacustom.com",
    "logo": "/assets/images/partner-logos/novacustom-logo.png"
  },
  {
    "name": "Open Broadcast System Ltd",
    "url": "https://www.obe.tv",
    "logo": "/assets/images/partner-logos/obs.png"
  },
  {
    "name": "Oxide Computer Company",
    "url": "https://oxide.computer",
    "logo": "/assets/images/partner-logos/oxide.png"
  },
  {
    "name": "Pengutronix",
    "url": "https://www.pengutronix.de/en",
    "logo": "/assets/images/partner-logos/pengutronix_logo.png"
  },
  {
    "name": "Protectli",
    "url": "https://www.protectli.com",
    "logo": "/assets/images/partner-logos/protectli.png"
  },
  {
    "name": "Purism",
    "url": "https://www.puri.sm",
    "logo": "/assets/images/partner-logos/purism_logo.svg"
  },
  {
    "name": "Secunet",
    "url": "https://www.secunet.com",
    "logo": "/assets/images/partner-logos/secunet_logo.svg"
  },
  {
    "name": "Starlabs",
    "url": "https://www.starlabs.systems",
    "logo": "/assets/images/partner-logos/starlabs_logo.svg"
  },
  {
    "name": "Supermicro",
    "url": "https://www.supermicro.com",
    "logo": "/assets/images/partner-logos/supermicro.png"
  },
  {
    "name": "SysPro",
    "url": "https://www.sysproconsulting.com",
    "logo": "/assets/images/partner-logos/syspro.png"
  },
  {
    "name": "System76",
    "url": "https://www.system76.com",
    "logo": "/assets/images/partner-logos/System76_logo.svg"
  },
  {
    "name": "9elements",
    "url": "https://www.9esec.io",
    "logo": "/assets/images/partner-logos/9e.svg"
  },
  {
    "name": "Binarly",
    "url": "https://www.binarly.com",
    "logo": "/assets/images/partner-logos/binarly.svg"
  },
  {
    "name": "Mullvad",
    "url": "https://www.mullvad.com",
    "logo": "/assets/images/partner-logos/mullvad.svg",
    "logoWidth": "178px",
    "logoHeight": "209px"
  },
  {
    "name": "Siemens",
    "url": "https://www.siemens.com",
    "logo": "/assets/images/partner-logos/siemens.svg"
  },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ES Module syntax (use `export default`)
export default () => shuffle(partners);
