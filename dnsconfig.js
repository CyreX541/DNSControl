var cloudflare = NewDnsProvider("cloudflare", "CLOUDFLAREAPI");
var REG_CHANGEME = NewRegistrar("ThirdParty", "NONE");

var DEFAULT = [

  // CAA
  CAA_BUILDER({
    label: "*",
    iodef: "mailto:admin@cxsrv.de",
    issue: ["letsencrypt.org"],
    issuewild: ["letsencrypt.org"],
  }),
  CAA_BUILDER({
    label: "@",
    iodef: "mailto:admin@cxsrv.de",
    issue: ["letsencrypt.org"],
    issuewild: ["letsencrypt.org"],
  }),

  // Defaultconf
  DnsProvider(cloudflare),
  REG_CHANGEME,
];

var MAIL01 = [

  // CNAME
  CNAME("autoconfig", "mail.cxsrv.de."),
  CNAME("autodiscover", "mail.cxsrv.de."),
  CNAME("webmail", "mail.cxsrv.de."),

  // MX
  MX("@", 10, "mail.cxsrv.de."),

  // SPF
  SPF_BUILDER({
    label: "@",
    parts: ["v=spf1", "mx", "~all"],
  }),
  SPF_BUILDER({
    label: "*",
    parts: ["v=spf1", "mx", "~all"],
  }),

  // SRV
  SRV("_autodiscover._tcp", 0, 1, 443, "mail.cxsrv.de."),
  SRV("_caldavs._tcp", 0, 1, 443, "mail.cxsrv.de."),
  SRV("_carddavs._tcp", 0, 1, 443, "mail.cxsrv.de."),
  SRV("_imap._tcp", 0, 1, 143, "mail.cxsrv.de."),
  SRV("_imaps._tcp", 0, 1, 993, "mail.cxsrv.de."),
  SRV("_pop3._tcp", 0, 1, 110, "mail.cxsrv.de."),
  SRV("_pop3s._tcp", 0, 1, 995, "mail.cxsrv.de."),
  SRV("_sieve._tcp", 0, 1, 4190, "mail.cxsrv.de."),
  SRV("_smtps._tcp", 0, 1, 465, "mail.cxsrv.de."),
  SRV("_submission._tcp", 0, 1, 587, "mail.cxsrv.de."),

  // TXT
  TXT("_caldavs._tcp", "path=/SOGo/dav/"),
  TXT("_carddavs._tcp", "path=/SOGo/dav/"),
  TXT(
    "_dmarc",
    "v=DMARC1; p=quarantine; rua=mailto:dmarc@fhsrv.de; ruf=mailto:dmarc@fhsrv.de; fo=1;"
  )
];

// Domains - Backend

// cxsrv.de
D(
  "cxsrv.de",
  DEFAULT,
  MAIL01,

  // A
  A("backup", "148.251.152.30"),
  A("data2", "159.69.203.63"),
  A("dh1", "94.130.75.68"),
  A("mail", "157.90.168.57"),
  A("voice", "162.55.60.38"),

  // AAAA
  AAAA("backup", "2a01:4f8:210:5126::1"),
  AAAA("data2", "2a01:4f8:1c1c:5b1d::1"),
  AAAA("dh1", "2a01:4f8:c0c:e911::1"),
  AAAA("mail", "2a01:4f8:1c1c:4a9d::1"),
  AAAA("voice", "2a01:4f8:1c1c:9680::1"),

  // TLSA
  TLSA(
    "_25._tcp.mail",
    3,
    1,
    1,
    "8dd735fc435585f048b12b576cf11a89187e820b3a57ff72d1172f9a6bdad128"
  ),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvcIuuPwv7AkPYFt9zMeHb+5Cim3KwVX7yV9y3cmqvJUKpBpowLZA4H549++lN9TIUhGLSJlx2oL+J5ykkSnC4my/1FFPA1NCjXxvRrd841tCsjTM3XuMyx2WkW7mV+Oc6VMpMUZT78SKW5OZ38pEqldRfsfkHb7S5/7dVgY5BU5RVNU8w4BDpq9MYi1XHz0Th/hw0Ww/4z2wZOL2qBtotX3Y96u0KDIK7wC/UGJbesiwkzTVRwOFK24Loz6GMQR1LdcdqaAFkKkIKNzjgCc8kPoO6BexXR2tKJ2hKP8lUwxSdwMzd66TdVxErSbFuaoKJcc6xylWK32AIzq4ZXY8iQIDAQAB"
  )
);

// Domains - Projekte

// rsmg-clan.de
D(
  "rsmg-clan.de",
  DEFAULT,
  MAIL01,

  // A
  A("data", "159.69.203.63"),

  // AAAA
  AAAA("data", "2a01:4f8:1c1c:5b1d::1"),

  // CNAME
  CNAME("amongus", "dh1.cxsrv.de."),
  CNAME("cloud", "data.rsmg-clan.de."),
  CNAME("crewlink", "voice.cxsrv.de."),
  CNAME("git", "data.rsmg-clan.de."),
  CNAME("mail", "mail.cxsrv.de."),
  CNAME("music", "voice.cxsrv.de."),
  CNAME("pma", "dh1.cxsrv.de."),
  CNAME("ts3", "voice.cxsrv.de."),
  CNAME("vpn", "dh1.cxsrv.de."),

  // SRV
  SRV("_ts3._udp.ts3", 1, 1, 9987, "ts3.rsmg-clan.de."),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4Jc/+r8ChOpWRr+inJrScjxuuSY3dHEuhdAWGIqZ1n2eBFzi3uUwUdeocHRS825N1w54FkYiFHZ97c13CBNnJIYcrMEfxbOqhblDivQ8L+9TFHjUs63dtUCfCPg0HBAhtswFYGtbSlIZJOJXcN5InhTLJClu10PF5EgWmaBslEpVo6NKq1JyVp47WOL8c/fOaJMywy3qKOs28fuXWpd3PzWfKRo5eIx/G5doLTGJNOo+WroxNat9OTKnn6pUvGO9ndzsbF5tHAoBQqYVIDWIMciMAasTFLPtj4M7Bc2AHT9xtQeIGMzSpg5E9RIc2lE+eNjmlpRNxFKWXmtRb5OiaQIDAQAB"
  )
);
