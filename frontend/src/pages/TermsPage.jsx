import { PageLayout } from '../components/layout';

const TermsPage = () => {
    return (
        <PageLayout>
            <div className="static-page">
                <section className="static-hero">
                    <div className="container">
                        <h1>Terms & Conditions</h1>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container">
                        <div className="prose">
                            <p className="text-tertiary mb-8">Last updated: January 2026</p>

                            <h2>1. Introduction</h2>
                            <p>
                                Welcome to ETour. These Terms and Conditions govern your use of our website and services.
                                By booking a tour with us, you agree to be bound by these terms.
                            </p>

                            <h2>2. Booking and Payment</h2>
                            <h3>2.1 Booking Confirmation</h3>
                            <p>
                                A booking is confirmed only upon receipt of the required deposit or full payment as
                                specified. Confirmation will be sent via email to the registered email address.
                            </p>
                            <h3>2.2 Payment Terms</h3>
                            <ul>
                                <li>A minimum deposit of 30% is required at the time of booking</li>
                                <li>Full payment must be made 15 days before the departure date</li>
                                <li>Failure to make payment may result in automatic cancellation</li>
                            </ul>

                            <h2>3. Cancellation Policy</h2>
                            <p>Cancellation charges are calculated based on the departure date:</p>
                            <table className="cost-table mt-4 mb-6">
                                <thead>
                                    <tr>
                                        <th>Days Before Departure</th>
                                        <th>Cancellation Charges</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>30+ days</td><td>₹2,000 processing fee only</td></tr>
                                    <tr><td>15-29 days</td><td>50% of tour cost</td></tr>
                                    <tr><td>7-14 days</td><td>75% of tour cost</td></tr>
                                    <tr><td>Less than 7 days</td><td>100% (No refund)</td></tr>
                                </tbody>
                            </table>

                            <h2>4. Tour Modifications</h2>
                            <p>
                                ETour reserves the right to modify tour itineraries due to weather conditions,
                                natural disasters, political situations, or other unforeseen circumstances.
                                In such cases, suitable alternatives will be provided where possible.
                            </p>

                            <h2>5. Liability</h2>
                            <p>
                                ETour acts as an intermediary between travelers and service providers (hotels,
                                transport, etc.). While we carefully select our partners, we are not liable for
                                any loss, injury, or damage arising from the services provided by third parties.
                            </p>

                            <h2>6. Travel Insurance</h2>
                            <p>
                                We strongly recommend that all travelers purchase comprehensive travel insurance
                                covering trip cancellation, medical emergencies, and personal belongings.
                            </p>

                            <h2>7. Passport and Visa</h2>
                            <p>
                                Travelers are responsible for ensuring they have valid travel documents. ETour is
                                not responsible for issues arising from improper documentation.
                            </p>

                            <h2>8. Health Requirements</h2>
                            <p>
                                Travelers must inform us of any health conditions that may affect their ability to
                                participate in tour activities. Some tours may have age or fitness requirements.
                            </p>

                            <h2>9. Contact Information</h2>
                            <p>
                                For any queries regarding these terms, please contact us at:<br />
                                Email: support@etour.com<br />
                                Phone: 1800-123-4567
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default TermsPage;
