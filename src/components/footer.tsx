import * as React from "react";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h6 className="font-bold text-lg">UPN Sehat</h6>
                        <p className="mt-2 text-sm">
                            © 2024 UPN Sehat. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <h6 className="font-bold text-lg">Links</h6>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-bold text-lg">Follow Us</h6>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
