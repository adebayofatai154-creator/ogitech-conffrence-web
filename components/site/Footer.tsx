import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="s-footer">
      <div className="s-container">
        <div className="s-footer__grid">
          <div className="s-footer__brand">
            <Image src="/logo.jpeg" alt="" width={48} height={48} />
            <div>
              <strong>{siteConfig.institution}</strong>
              <p>
                {siteConfig.school}
                <br />
                {siteConfig.conferenceTitle}
                <br />
                {/* {siteConfig.dates} */}
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href={siteConfig.submitHref}>Submit Paper</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.chairmanPhone}`}>
                  Chairman: {siteConfig.contact.chairmanPhone}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.secretaryPhone}`}>
                  Secretary: {siteConfig.contact.secretaryPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="s-footer__bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.school}. All rights
            reserved.
          </span>
          {/* <span>In collaboration with Cisco Networking Academy.</span> */}
        </div>
      </div>
    </footer>
  );
}
