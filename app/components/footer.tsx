import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMarker, FaPhone, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-[90%] mx-auto my-10 p-6 md:p-10 bg-[#0B1A2A] max-lg:text-xs rounded-2xl border border-blue-500 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 flex-wrap">
                {/* Phone */}
                <div className="flex-1 min-w-[220px] flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-2">
                        <FaPhone className="text-blue-400 rotate-90" size={20} />
                        <span className="text-blue-400 font-medium">Request a Call</span>
                    </div>
                    <span className="text-white max-lg:text-xs font-medium">
                        +971585593327
                    </span>
                </div>

                {/* Email */}
                <div className="flex-1 min-w-[220px] flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-2">
                        <FaEnvelope className="text-blue-400" size={20} />
                        <span className="text-blue-400 font-medium">E-mail</span>
                    </div>
                    <span className="text-white max-lg:text-xs font-medium">
                        info@GoStudy.ae
                    </span>
                </div>

                <div className="flex-1 min-w-[220px] flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-2">
                        <FaMarker className="text-blue-400" size={20} />
                        <span className="text-blue-400 font-medium">Location</span>
                    </div>
                    <span className="text-white max-lg:text-xs font-medium">
                        1st Floor, Incubator Building, Masdar City,
                        <br />
                        Abu Dhabi, United Arab Emirates
                    </span>
                </div>

                {/* Social Media */}
                <div className="flex-1 min-w-[220px] flex flex-col items-start">
                    <span className="text-blue-400 font-medium mb-2">Social Media</span>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com/gostudy.ae/"
                            target="_blank"
                            rel="noopener"
                            className="text-white hover:text-blue-400 transition"
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="https://www.instagram.com/gostudy.ae/"
                            target="_blank"
                            rel="noopener"
                            className="text-white hover:text-blue-400 transition"
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="https://www.youtube.com/@gostudy-ae"
                            target="_blank"
                            rel="noopener"
                            className="text-white hover:text-blue-400 transition">
                            <FaYoutube size={20} />
                        </a>

                        <a href="https://www.linkedin.com/company/gostudy-ae/"
                            target="_blank"
                            rel="noopener"

                            className="text-white hover:text-blue-400 transition">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://wa.me/+971585341673"
                            target="_blank"
                            rel="noopener"

                            className="text-white hover:text-blue-400 transition">
                            <FaWhatsapp size={20} />
                        </a>
                        <a
                            href="https://www.tiktok.com/@gostudy.ae"
                            target="_blank"
                            rel="noopener"

                            className="text-white hover:text-blue-400 transition">
                            <FaTiktok size={20} />
                        </a>

                        {/* <a 
            href="#" 
            target="_blank" 
            className="text-white hover:text-blue-400 transition">
              <FaXTwitter size={20} />
            </a> */}

                    </div>
                </div>
            </div>
        </footer>
    );
}