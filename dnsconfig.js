var cloudflare = NewDnsProvider("cloudflare", "CLOUDFLAREAPI");
var REGISTRAR = NewRegistrar("ThirdParty", "NONE");

DEFAULTS(
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
  DnsProvider(cloudflare)
);

var MAIL01 = [
  // CNAME
  CNAME("autoconfig", "mail.cxsrv.de."),
  CNAME("autodiscover", "mail.cxsrv.de."),
  CNAME("webmail", "mail.cxsrv.de."),

  // DMARC
  DMARC_BUILDER({
    policy: "quarantine",
    ruf: ["mailto:reports@dmarc.fhsrv.de"],
    rua: ["mailto:reports@dmarc.fhsrv.de"],
    failureOptions: "1",
  }),

  // MTA-STS
  CNAME("mta-sts", "mail.cxsrv.de."),
  TXT("_mta-sts", "v=STSv1; id=20160831085700Z"),
  TXT("_smtp._tls", "v=TLSRPTv1; rua=mailto:admin+report@cxsrv.de"),

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
];

// Domains - Backend

// cxsrv.de
D(
  "cxsrv.de",
  REGISTRAR,
  MAIL01,

  // FSN1-DC10 / FSN1-DC12 - Backup
  A("backup", "148.251.152.30"),
  AAAA("backup", "2a01:4f8:210:5126::1"),

  // DUS1 - DATA
  A("data", "161.97.146.6"),
  AAAA("data", "2a02:c206:3007:8578::1"),

  // FSN1-DC14 - Mail
  A("mail", "49.12.213.26"),
  AAAA("mail", "2a01:4f8:1c17:c55a::1"),

  // DUS1 - GAMES
  A("games", "161.97.146.6"),
  AAAA("games", "2a02:c206:3007:8578::1"),

  // NGB1-DC3 - VOICE
  A("voice", "49.12.205.237"),
  AAAA("voice", "2a01:4f8:c2c:1ab0::1"),

  // NC01 - Status
  CNAME("status", "status.fhsrv.de"),

  // TLSA
  TLSA(
    "_25._tcp.mail",
    3,
    1,
    1,
    "c80ba3bc63c45fb4d78316a103831ef3b3b995b157696c27282f256b5eca5364"
  ),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5BmnzgIW7nXALIhYQn0RoNodFy56R7RUPrrDaGSMkurXkbSmnTr5TApMHO5ujxR+i3Jq5S76nMKzlWt37V8c0uKViybahslI6eHt5zHa66JOigvF34cBSHZzolOCoPNCAAo10zmrbelIisa+0+PCU0VCrYuVxKzNXL9nOakZL2Pjzpsjdi9TL8av77wcdzm2YdLXcvDJ7oqPYNqLipYk34ipfUbrgXqi/98Pvgn9rYS02n+9AWAurkJ8ifIjRqfnUst2jFSFNhdWBpFpvfY3G1wy4dXYUijjI9Dl2NlLYQBmrQZZtPxa2k0O3WtZ8KXJHBJG0PP1876AVpxadqUYhQIDAQAB"
  )
);

// Domains - Projekte

// rsmg-clan.de
D(
  "rsmg-clan.de",
  REGISTRAR,
  MAIL01,

  // CNAME - DATA
  CNAME("cloud", "data.cxsrv.de."),
  CNAME("git", "data.cxsrv.de."),
  CNAME("pma", "data.cxsrv.de."),
  CNAME("vpn", "data.cxsrv.de."),

  // CNAME - MAIL
  CNAME("mail", "mail.cxsrv.de."),

  // CNAME - GAMES
  CNAME("amongus", "games.cxsrv.de."),
  CNAME("gta", "games.cxsrv.de."),
  CNAME("mc", "games.cxsrv.de."),

  // CNAME - VOICE
  CNAME("crewlink", "voice.cxsrv.de."),
  CNAME("music", "voice.cxsrv.de."),
  CNAME("ts3", "voice.cxsrv.de."),

  // SRV
  SRV("_ts3._udp.ts3", 1, 1, 9987, "voice.cxsrv.de."),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2Z7Kra9m/OBpeKxu4HVadFEGDMO97vjF4sxgcjhat3lxk4qyXDCXNIpMcwpjIfYc0vWSrDpkwasSuQpSWarHZy76eCpFlGME0U02LmDb/TsQxO+5gqZduW2bqiYr6red3PT5P71Vmh8QALWw52L2CZqGW0vuMwTrNbUdix2tgRLTGUrukGu8XegLA70r1xowI5EXwA3USEkmTZPezaBHa084bNyI0v/V91Cz1ixRYnOW9iUzhWUwUH4mwTOHs6yiPBcY8ystA+7cxe7jaezEYjvfoP48uHP9yLQDhLBt9EaY7mVKW8FUbwA2awZbIexOGC/XCwZ4f24ASgwsgTfkWQIDAQAB"
  )
);
