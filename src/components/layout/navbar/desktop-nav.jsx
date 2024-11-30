import Link from "next/link";
import cn from "classnames";
import navData from "@data/nav";
import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";
import { Container, Col, Row } from "@bootstrap";
import { NavbarWrap, Nav, NavList, SubMenu } from "./desktop-nav.style";
import { useMainContext } from "src/context";

const DesktopNav = ({ bg, className }) => {
  const { categories } = useMainContext();
  return (
    <NavbarWrap bg={bg} className={cn(className)}>
      <Container>
        <Row>
          <Col>
            <Nav>
              <NavList>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  {" "}
                  <Link href="/about">About</Link>
                </li>
                {categories?.map((navItem, index) => (
                  <li
                    key={index}
                    className={
                      navItem.children?.length > 0 ? "dropdown" : undefined
                    }
                  >
                    <Link href={`/collection/${navItem.slug}`}>
                      {navItem.name}
                      {navItem.children?.length > 0 && <IoIosArrowDown />}
                    </Link>

                    {navItem.children?.length > 0 && (
                      <SubMenu>
                        {navItem.children.map((subItem) => (
                          <li key={index}>
                            <Link href={`/collection/${subItem.slug}`}>
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </SubMenu>
                    )}
                  </li>
                ))}
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </NavList>
            </Nav>
          </Col>
        </Row>
      </Container>
    </NavbarWrap>
  );
};

DesktopNav.propTypes = {
  bg: PropTypes.string,
};

export default DesktopNav;
