import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Image from "@components/ui/image";
import {Container, Col, Row} from "@bootstrap";
import Breadcrumb from "@components/ui/breadcrumb";

const AboutPage = () => {
    return (
        <Layout>
            <Head>
                <title>{"About :: " + settings?.title}</title>
                <meta name="description" content={settings?.description}/>
            </Head>

            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="About Us"
            />


            <section className="about-page-wrapper">
                <Container>
                    <h2>Griha Decor specializes in stylish sofa beds and interior furnishings. We focus on quality, comfort, and innovative designs to create functional, beautiful spaces that feel like home..</h2>
                </Container>

                <Container fluid className="mt-3 mt-md-5">
                    <Row>
                        <Col md={6}>
                            <figure>
                                <Image
                                    width={950}
                                    height={600}
                                    alt={settings?.title}
                                    src="/images/about/02.jpg"
                                />
                            </figure>
                        </Col>

                        <Col md={6}>
                            <figure>
                                <Image
                                    width={950}
                                    height={600}
                                    alt={settings?.title}
                                    src="/images/about/01.jpg"
                                />
                            </figure>
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-3 mt-md-5">
                    <Row>
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <div className="about-store">
                                <h4>OUR STORES</h4>
                                <p>Griha Decor began with a simple idea: to make every home a haven of beauty and comfort. Founded by a team of design enthusiasts, we saw a gap in the market for multifunctional, aesthetically pleasing furnishings that cater to modern lifestyles. From sofa beds that optimize space to carefully curated interior accessories, we craft products that reflect our passion for design and quality.</p>
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className="about-store">
                                <h4>OUR MISSION</h4>
                                <p>At Griha Decor, our mission is to bring comfort, style, and functionality into every home. We aim to transform living spaces with thoughtfully designed sofa beds, accessories, and furnishings that blend elegance with practicality. By prioritizing quality, affordability, and innovation, we strive to create products that enhance everyday living and inspire a sense of belonging in every home.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default AboutPage;
