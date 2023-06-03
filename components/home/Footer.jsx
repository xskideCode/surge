'use client';

import Link from "next/link";
import Image from "next/image";

import { BsFacebook, BsInstagram, BsDiscord, BsTwitter } from "react-icons/bs";
import Socials from "./Socials";
import { usePathname } from "next/navigation";

export const footerLinks = [
  {
    title: "Links",
    links: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Videos",
        link: "/videos",
      },
      {
        name: "Channels",
        link: "/channels",
      },
    ],
  },
  {
    title: "Resoures",
    links: [
      {
        name: "Help Center",
        link: "/help-center",
      },
      {
        name: "Policies",
        link: "/policies",
      },
      {
        name: "Terms & Services",
        link: "/terms-and-services",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: BsInstagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: BsFacebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: BsTwitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: BsDiscord,
    link: "https://www.discord.com/",
  },
];

const Footer = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (  
  <section className="relative flex justify-between items-center pb-4 flex-col w-full pt-4 mt-auto ">
    {isMainPage && (
    <>
      <hr className="absolute -top-0 md:-top-2 w-screen border-zinc-600" />
      <div className="flex justify-between sm:flex-row flex-col mb-8 w-full">
        <div className="flex-1 flex-col justify-start mr-10">
          <Image
            src="/assets/icons/logo2.svg"
            alt="surge"
            className="object-contain "
            width={100}
            height={70}
          />
          <p className="paragraph2 mt-2 sm:mt-4 max-w-[510px] md:px-0 px-2">
            A community for small YouTube channels to share content, get tips and
            find collaboration opportunities.
          </p>
        </div>
        

        <div
          className="
            flex-[1.5] 
            w-full 
            flex 
            flex-row 
            justify-around  
            flex-wrap 
            md:mt-0 
            mt-5 
            md:px-0 
            px-2
          "
        >
          {footerLinks.map((footerLink, i) => (
            <div key={i} className="flex flex-col my-0 sm:my-2 min-w-[100px]">
              <h4 className="font-poppins font-medium text-base sm:text-[18px] leading-[27px] text-white">
                {footerLink.title}
              </h4>
              <ul className="list-none mt-2 sm:mt-4">
                {footerLink.links.map((link, index) => (
                  <Link key={index} href={link.link}>
                    <li
                      key={index}
                      className={`
                        font-poppins 
                        font-normal 
                        text-sm
                        sm:text-[16px] 
                        leading-[24px] 
                        text-dimWhite 
                        hover:text-secondary 
                        cursor-pointer 
                        ${index !== footerLink.links.length - 1 ? "mb-1 sm:mb-4" : "mb-0"}
                      `}
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
    )}
    <div
      className="
        w-full 
        flex 
        justify-between 
        items-center 
        md:flex-row 
        flex-col 
        sm:pt-6 
        pt-4
        border-t-[1px] 
        border-t-[#3F3E45]
      "
    >
      <p
        className="
          paragraph2
          text-center           
          text-dimWhite
        "
      >
        Copyright <span className="align-bottom text-lg sm:text-[21px]">©</span> 2023
        Surge. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-4 gap-5">
        {socialMedia.map((social) => (
          <Socials
            key={social.id}
            icon={social.icon}
            label={social.id}
            link={social.link}
            org
          />
        ))}
      </div>
    </div>
  </section>
)
        };

export default Footer;
