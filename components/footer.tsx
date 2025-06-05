import Link from "next/link";

const needHelpLinks = [
  "Contact Us",
  "Track Order",
  "Returns & Refunds",
  "FAQs",
  "Career",
];

const companyLinks = ["About Us", "Blog", "Collaboration", "Media"];

const moreInfoLinks = [
  "Terms and Conditions",
  "Privacy Policy",
  "Shipping Policy",
  "Sitemap",
];

const footerLinks = [
  { title: "Need Help", links: needHelpLinks },
  { title: "Company", links: companyLinks },
  { title: "More Info", links: moreInfoLinks },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-800 mt-0 p-0 text-white w-full flex justify-center border-t border-zinc-700">
      <div className="w-[90vw] max-w-[1800px] flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 py-12 px-4 md:px-8 border-b border-zinc-700">
          <div className="flex flex-col md:flex-row gap-12 w-full">
            {footerLinks.map((footerLink) => (
              <div key={footerLink.title} className="min-w-[180px]">
                <h2 className="mb-3 text-lg font-semibold text-zinc-100 tracking-wide">{footerLink.title}</h2>
                <ul className="flex flex-col gap-1">
                  {footerLink.links.map((link) => (
                    <li key={link}>
                      <Link
                        className="block p-1 rounded-md focus-visible:ring ring-blue-500 text-base text-zinc-300 hover:text-white transition-colors duration-150"
                        href="#"
                        aria-label={link}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-end justify-end md:justify-center gap-4 mt-8 md:mt-0">
            <Link
              href="https://www.linkedin.com/in/uchechukwu-fejiokwu/"
              target="_blank"
              aria-label="LinkedIn"
              className="flex items-center justify-center bg-zinc-300 hover:bg-white p-2 rounded-full focus-visible:ring ring-blue-500 ring-offset-2 ring-offset-zinc-800 shadow transition-all duration-200"
            >
              <svg
                height={18}
                width={18}
                viewBox="0 -2 44 44"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                aria-hidden="true"
              >
                <g id="SVGRepo_iconCarrier">
                  <title>LinkedIn-color</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-702.000000, -265.000000)" fill="#333">
                      <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
            <Link
              href="https://x.com/Deverydaytrader"
              target="_blank"
              aria-label="Twitter"
              className="flex items-center justify-center bg-zinc-300 hover:bg-white p-2 rounded-full focus-visible:ring ring-blue-500 ring-offset-2 ring-offset-zinc-800 shadow transition-all duration-200"
            >
              <svg
                height={18}
                width={18}
                viewBox="0 -4 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                aria-hidden="true"
              >
                <g id="SVGRepo_iconCarrier">
                  <title>Twitter-color</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-300.000000, -164.000000)" fill="#333">
                      <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
            <Link
              href="https://github.com/uchepaul1"
              target="_blank"
              aria-label="GitHub"
              className="flex items-center justify-center bg-zinc-300 hover:bg-white p-2 rounded-full focus-visible:ring ring-blue-500 ring-offset-2 ring-offset-zinc-800 shadow transition-all duration-200"
            >

              <svg
                height={18}
                width={18}
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                aria-hidden="true"
              >
                <g id="SVGRepo_iconCarrier">
                  <title>github [#142]</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-140.000000, -7559.000000)" fill="#333">
                      <g transform="translate(56.000000, 160.000000)">
                        <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center pt-6 pb-8 px-4 md:px-8 text-zinc-400">
          <div className="mb-2 md:mb-0 flex items-center gap-2">
            <span>
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block mr-1"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <span>
              Copyright © {new Date().getFullYear()}{" "}
              <Link
                href="/"
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors duration-150 focus-visible:ring ring-blue-500 ring-offset-1 ring-offset-zinc-800"
              >
                WearHouse
              </Link>
              . All rights reserved.
            </span>
          </div>
          <div className="flex gap-4 flex-wrap text-xs">
            <span>Made with <span className="text-red-400" aria-label="love">♥</span> by Uchechukwu Paul Fejiokwu</span>
            <span>|</span>
            <span>Powered by Next.js & TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}