import cn from "classnames";
import Link from "next/link";
import navData from "@data/nav";
import PropTypes from "prop-types";
import Logo from "@components/ui/logo";
import OffCanvas from "@components/ui/offCanvas";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { MobileNav } from "@components/layout/navbar/mobile-nav.style";
import { getClosest, getSiblings, slideToggle, slideUp } from "@utils/method";
import {
  OffCanvasCloseBtn,
  OffCanvasHead,
} from "@components/ui/offCanvas/style";
import { useMainContext } from "src/context";

const MobileNavbar = ({ isOpen, onHandler }) => {
  const { categories } = useMainContext();
  const onNavHandler = (e) => {
    const target = e.target;
    const hasSubmenus = getSiblings(target);
    hasSubmenus?.length > 0 && e.preventDefault();
    target.classList.toggle("menu-expand");
    const parent = getClosest(target, "LI");
    const childNodes = parent.childNodes;
    const parentSiblings = getSiblings(parent);
    parentSiblings.forEach((sibling) => {
      const sibChildNodes = sibling.childNodes;
      sibChildNodes.forEach((child) => {
        if (child.classList.contains("mm-next-level")) {
          child.classList.remove("menu-expand");
        }
        if (child.nodeName === "UL") {
          slideUp(child, 300);
        }
      });
    });
    childNodes.forEach((child) => {
      if (child.nodeName === "UL") {
        slideToggle(child, 300);
      }
    });
  };

  return (
    <OffCanvas open={isOpen} onHandler={onHandler}>
      <OffCanvasHead>
        <Logo width={100} src="/images/logo/logo.png" />
        <OffCanvasCloseBtn onClick={() => onHandler()}>x</OffCanvasCloseBtn>
      </OffCanvasHead>

      <MobileNav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>

          {categories?.map((nav, index) => (
            <li key={index}>
              {/* <Link  href={`/collection/${nav.slug}`} legacyBehavior> */}
              <a
                href={void 0}
                role="button"
                onClick={(event) => onNavHandler(event)}
                className={cn({
                  "mm-next-level": nav?.children || nav?.mega_menu,
                })}
              >
                {nav?.name}
                {(nav?.children || nav?.mega_menu) && (
                  <CgMathPlus className="plus" />
                )}
                {(nav?.children || nav?.mega_menu) && (
                  <CgMathMinus className="minus" />
                )}
              </a>
              {/* </Link> */}
              {nav?.children && (
                <ul>
                  {nav?.children?.map((item) => (
                    <li key={item?.name} className={item?.badge}>
                      <Link href={`/collection/${item?.slug}`}>
                        {item?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </MobileNav>
    </OffCanvas>
  );
};

MobileNavbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onHandler: PropTypes.func.isRequired,
};

export default MobileNavbar;
