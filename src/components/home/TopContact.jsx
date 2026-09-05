import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "../../config/siteConfig";

const TopContact = () => {
    return (
        <div className="w-full bg-[#2e2751] text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

                {/* Left - Contact Information */}
                <div className="flex items-center gap-4 text-sm">

                    {/* Phone */}
                    <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                        className="transition-colors hover:text-blue-400"
                    >
                        {siteConfig.contact.phone}
                    </a>

                    <span className="text-gray-600">|</span>

                    {/* Email */}
                    <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="hidden transition-colors hover:text-blue-400 sm:block"
                    >
                        {siteConfig.contact.email}
                    </a>

                </div>


                {/* Right - Social Media */}
                <div className="flex items-center gap-4">

                    {/* WhatsApp */}
                    <a
                        href={siteConfig.social.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="transition-transform hover:scale-110 hover:text-green-400"
                    >
                        <FaWhatsapp size={16} />
                    </a>

                    {/* Facebook */}
                    <a
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="transition-transform hover:scale-110 hover:text-blue-400"
                    >
                        <FaFacebookF size={15} />
                    </a>

                    {/* Instagram */}
                    <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="transition-transform hover:scale-110 hover:text-pink-400"
                    >
                        <FaInstagram size={17} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="transition-transform hover:scale-110 hover:text-blue-400"
                    >
                        <FaLinkedinIn size={16} />
                    </a>

                    {/* YouTube */}
                    <a
                        href={siteConfig.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="transition-transform hover:scale-110 hover:text-red-400"
                    >
                        <FaYoutube size={18} />
                    </a>

                    {/* X / Twitter */}
                    <a
                        href={siteConfig.social.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        className="transition-transform hover:scale-110 hover:text-gray-300"
                    >
                        <FaXTwitter size={15} />
                    </a>
                    <button className="ml-4 rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                        Get In Touch
                    </button>

                </div>

            </div>
        </div>
    );
};

export default TopContact;