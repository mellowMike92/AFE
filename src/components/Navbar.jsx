import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { useGSAP } from '@gsap/react';
import { scroller } from 'react-scroll';
import NavDropdown from './NavDropdown';

gsap.registerPlugin(SplitText, CSSPlugin);
const servicesItems = [
    { label: ' Paint Protection Film', link: '/ppf' },
    { label: 'Ceramic Coating', link: '/cc' },
    { label: 'Vinyl Wrapping', link: '/vw' },
    { label: 'Window Tinting', link: '/wt' },
    { label: 'Brake Caliper Paint', link: '/bcp' },
    { label: 'Stars in the Ceiling', link: '/stars' },
  ];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const menuRef = useRef(null);
    const topBarRef = useRef(null);
    const middleBarRef = useRef(null);
    const bottomBarRef = useRef(null);
    const navbarRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === '/';

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
      };
    
      const closeDropdown = () => {
        setOpenDropdown(null);
      };

    const handleNavigation = (target) => {
        if (isHomePage) {
            scroller.scrollTo(target, {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart'
            });
        } else {
            navigate('/', { replace: true }).then(() => {
                setTimeout(() => {
                    scroller.scrollTo(target, {
                        duration: 500,
                        delay: 0,
                        smooth: 'easeInOutQuart'
                    });
                }, 100); // slight delay to ensure the page is loaded
            });
        }
    };

    const LinkComponent = isHomePage ? ScrollLink : RouterLink;

    useGSAP(() => {
        const menu = menuRef.current;
        const links = menu.querySelectorAll('.menu-link');
        const split = new SplitText(links, { type: 'chars' }); // Ensure split is defined before use

        if (isOpen) {
            const tl = gsap.timeline();
            tl.to(menu, { minHeight: '360px',height: "auto", opacity: 1, duration: 0.2, display: 'flex' })
              .from(split.chars, { opacity: 0, y: 20, stagger: 0.05, duration: 0.2, ease: 'power2.out' }, "<")
              .to(topBarRef.current, { y: 6, rotation: 135, transformOrigin: "center center", duration: 0.2 }, "<")
              .to(middleBarRef.current, { y: 0, rotation: 180, opacity: 0, transformOrigin: "center center", duration: 0.2 }, "<")
              .to(bottomBarRef.current, { y: -6, rotation: -135, transformOrigin: "center center", duration: 0.2 }, "<");
        } else {
            const tl = gsap.timeline();
            // Start all animations at the same time
            tl.to(menu, { maxHeight: 0, opacity: 1, duration: 0.2, display: 'none' }, "<")
              .to(topBarRef.current, { y: 0, rotation: 0, duration: 0.2 }, "<")
              .to(middleBarRef.current, { y: 0, rotation: 0, opacity: 1, transformOrigin: "center center", duration: 0.2 }, "<")
              .to(bottomBarRef.current, { y: 0, rotation: 0, duration: 0.2 }, "<");
        }
    }, [isOpen]);

    return (
        <div className="flex flex-col items-center w-full"> 
            <div className="w-full flex justify-center"> 
                <img src="/AFE.webp" alt="AFE Logo" className="mt-4 w-24 h-auto" />
            </div>
        <div ref={navbarRef} className="navbar sticky top-0 w-full flex justify-between items-center px-4 py-1 z-[999] bg-black transition-all ease-out duration-500" style={{ height: '60px' }}>
            <div className="links hidden md:flex justify-center font-azo-sans font-normal text-white" style={{ flexGrow: 3 }}>
                <LinkComponent to={isHomePage ? "home" : "/"} smooth={true} duration={500} className="mx-10 cursor-pointer hover:text-red-500 text-xl" onClick={() => handleNavigation('home')}>HOME</LinkComponent>
                <LinkComponent to={isHomePage ? "about" : "/#about"} smooth={true} duration={500} className="mx-10 cursor-pointer hover:text-red-500 text-xl" onClick={() => handleNavigation('about')}>ABOUT</LinkComponent>
                {/* <LinkComponent to={isHomePage ? "services" : "/"} smooth={true} duration={500} className="mx-10 cursor-pointer hover:text-red-500 text-xl" onClick={() => handleNavigation('services')}>SERVICES</LinkComponent> */}
                <NavDropdown
                    title="SERVICES"
                    items={servicesItems}
                    isOpen={openDropdown === 'services'}
                    toggleDropdown={() => toggleDropdown('services')}
                    closeDropdown={closeDropdown}
                />
                <LinkComponent to={isHomePage ? "contact" : "/#contact"} smooth={true} duration={500} className="mx-10 cursor-pointer hover:text-red-500 text-xl" onClick={() => handleNavigation('contact')}>CONTACT</LinkComponent>
                <RouterLink to={"/store"} smooth={true} duration={500} className="mx-10 cursor-pointer hover:text-red-500 text-xl uppercase" >Store</RouterLink>
                <RouterLink to={"/socials"} smooth={true} duration={500} className="mx-10 cursor-pointer hover:text-red-500 text-xl uppercase" >Socials</RouterLink>
            </div>
            <div className="md:hidden flex items-center z-40">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white z-50">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path ref={topBarRef} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16" />
                        <path ref={middleBarRef} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                        <path ref={bottomBarRef} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18h16" />
                    </svg>
                </button>
            </div>
            <div ref={menuRef} className="mobile-menu md:hidden absolute top-0 left-0 w-full bg-zinc-500 flex flex-col items-center z-30 overflow-x-hidden overflow-y-scroll  rounded-lg transition-max-height duration-500 ease-out" style={{ maxHeight: 0, opacity: 0, display: 'none' }}>
                <LinkComponent to={isHomePage ? "home" : "/"} smooth={true} duration={300} className="menu-link py-2 cursor-pointer hover:text-red-500 text-xl" onClick={() => { setIsOpen(false); handleNavigation('home'); }}>HOME</LinkComponent>
                <LinkComponent to={isHomePage ? "about" : "/#about"} smooth={true} duration={300} className="menu-link py-2 cursor-pointer hover:text-red-500 text-xl" onClick={() => { setIsOpen(false); handleNavigation('about'); }}>ABOUT</LinkComponent>
                {/* <LinkComponent to={isHomePage ? "services" : "/services"} smooth={true} duration={300} className="menu-link py-2 cursor-pointer hover:text-red-500 text-xl" onClick={() => { setIsOpen(false); handleNavigation('services'); }}>SERVICES</LinkComponent> */}
                <NavDropdown
                    title="SERVICES"
                    items={servicesItems}
                    isOpen={openDropdown === 'services'}
                    toggleDropdown={() => toggleDropdown('services')}
                    closeDropdown={closeDropdown}
                />
                <LinkComponent to={isHomePage ? "contact" : "/#contact"} smooth={true} duration={300} className="menu-link py-2 cursor-pointer hover:text-red-500 text-xl" onClick={() => { setIsOpen(false); handleNavigation('contact'); }}>CONTACT</LinkComponent>
                <RouterLink to={"/store"} smooth={true} duration={300} className="menu-link py-2 cursor-pointer hover:text-red-500 text-xl uppercase " >Store</RouterLink>
                <RouterLink to={"/socials"} smooth={true} duration={300} className="menu-link py-2 cursor-pointer hover:text-red-500 text-xl uppercase" >Socials</RouterLink>
            </div>
        </div>
        </div>
    );
};

export default Navbar;
