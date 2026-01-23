import { PageLayout } from '../components/layout';

const AboutPage = () => {
    return (
        <PageLayout>
            <div className="static-page">
                <section className="static-hero">
                    <div className="container">
                        <h1>About ETour</h1>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container">
                        <div className="prose">
                            <p className="text-lg mb-8">
                                ETour is India's premier tour operator, offering carefully curated travel experiences
                                to destinations across India and around the world since 2005.
                            </p>

                            <div className="two-column gap-8 mb-12" style={{ alignItems: 'flex-start' }}>
                                <div>
                                    <h2>Our Story</h2>
                                    <p>
                                        Founded with a passion for travel and a commitment to excellence, ETour has grown
                                        from a small travel agency to one of the most trusted names in Indian tourism.
                                        Our journey began with a simple mission: to make travel accessible, enjoyable,
                                        and memorable for everyone.
                                    </p>
                                    <p>
                                        Over the years, we have served thousands of happy travelers, creating unforgettable
                                        memories and lasting connections. Our team of experienced travel experts works
                                        tirelessly to design tour packages that cater to diverse interests and budgets.
                                    </p>
                                </div>
                                <div className="card" style={{ background: 'var(--bg-tertiary)', padding: 'var(--spacing-6)' }}>
                                    <h3 className="mb-4">By the Numbers</h3>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>500+</span>
                                            <p className="text-tertiary">Destinations</p>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>50K+</span>
                                            <p className="text-tertiary">Happy Travelers</p>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>20+</span>
                                            <p className="text-tertiary">Years Experience</p>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>4.8</span>
                                            <p className="text-tertiary">Average Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2>Our Mission</h2>
                            <p>
                                To provide exceptional travel experiences that inspire, educate, and create lasting
                                memories for our travelers, while promoting sustainable tourism practices and
                                supporting local communities.
                            </p>

                            <h2>Our Values</h2>
                            <div className="grid grid-cols-3 md-grid-cols-2 sm-grid-cols-1 gap-6 mt-6">
                                {[
                                    { icon: '🎯', title: 'Excellence', desc: 'We strive for excellence in every aspect of our service' },
                                    { icon: '🤝', title: 'Trust', desc: 'Building lasting relationships through transparency and reliability' },
                                    { icon: '🌱', title: 'Sustainability', desc: 'Committed to responsible and eco-friendly travel practices' },
                                    { icon: '💡', title: 'Innovation', desc: 'Continuously improving our offerings and technology' },
                                    { icon: '❤️', title: 'Customer First', desc: 'Your satisfaction is our top priority' },
                                    { icon: '🌍', title: 'Cultural Respect', desc: 'Promoting understanding and respect for local cultures' },
                                ].map((value, index) => (
                                    <div key={index} className="card p-5 text-center">
                                        <span style={{ fontSize: '2.5rem' }}>{value.icon}</span>
                                        <h4 className="mt-3 mb-2">{value.title}</h4>
                                        <p className="text-tertiary" style={{ fontSize: 'var(--font-size-sm)' }}>{value.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 className="mt-12">Our Team</h2>
                            <p>
                                Our team consists of passionate travel enthusiasts, experienced tour managers,
                                and dedicated customer support professionals. Together, we work to ensure that
                                every journey with ETour exceeds expectations.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default AboutPage;
