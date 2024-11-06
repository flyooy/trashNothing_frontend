import './css/Homepage.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="homepage">
            <section className="upper_section">
                <article className='upper_article'>
                    <h1>Hilf mit die Umwelt zu schützen</h1>
                    <p>
                        Abfälle bedrohen Vögel, Delfine und Co. Mehr als zehn Millionen Tonnen Abfälle gelangen jährlich in die  Ozeane. Sie kosten Abertausende Meerestiere das Leben. Seevögel verwechseln Plastik mit natürlicher Nahrung, Delfine verfangen sich in alten Fischernetzen. Hilf mit Müll zu reduzieren und trashnothing.
                    </p>
                    <Link to="/marktplatz">
                            <button className='button_starteJetzt'>Starte jetzt!</button>
                    </Link>
                </article>
                <article>
                    <img className='img_upper' src="src/assets/img/homepage/main illustration.png" alt="person in field" />
                </article>
            </section>
            
            <h2 className='h2_eCommerce'>Lebe eCommerce mal anders</h2>

            <section className="Lebe_eCommerce">
                <article className="article_left">
                <img className='img_article' src="src/assets/img/homepage/1.png" alt="guy sitting at laptop" />
                <img className='img_wierd_left' src="src/assets/img/homepage/2.png" alt="smartphone with website on screen" />
                    <h3 className='h3_article'>Verkaufen statt wegwerfen</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                    </p>
                </article>
                <article className="article_mid">
                    <img className='img_article' src="src/assets/img/homepage/3.png" alt="chair" />
                    <h3 className='h3_article'>Verschenke und Schütze</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                    </p>
                </article>
                <article className="article_right">
                    <img className='img_article' src="src/assets/img/homepage/4.png" alt="forest" />
                    <img className='img_wierd_right_top' src="src/assets/img/homepage/7.png" alt="woman sitting on rock" />
                    <img className='img_wierd_right_mid' src="src/assets/img/homepage/6.png" alt="woman sitting on rock" />
                    <img className='img_wierd_right_bottom' src="src/assets/img/homepage/5.png" alt="woman sitting on rock" />
                    <h3 className='h3_article'>Der Umwelt zuliebe</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                    </p>
                </article>
            </section>

            <section className="purple_section">
                <article className="ohne_limits_purple">
                    <img className='purple_img1' src="src/assets/img/homepage/2girlsAtMac.png" alt="2 Girls with Mac" />
                    <div className='div_purple1'>
                        <h3 className='h3_purple'>Ohne Limits</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                        </p>
                        <Link to="/registration">
                            <button className='button_zurDoku'>Registriere dich jetzt!</button>
                    </Link>
                    </div>
                </article>
                <article className="Community_purple">
                    <div className='div_purple2'>
                        <h3 className='h3_purple'>Kenn deine Community</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                        </p>
                        <Link to="/login">
                            <button className='button_zurDoku'>Melde dich jetzt an!</button>
                    </Link>
                    </div>
                    <img className='purple_img2' src="src/assets/img/homepage/dudeAtWhiteboard.png" alt="Guy at Whiteboard" />
                </article>
            </section>

            <section className="last_Section">
                <h2>Von echten Menschen unterstützt</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                </p>
                <img className='img_unten' src="src/assets/img/homepage/gruppenbild_unten.png" alt="gruppenbild" />
            </section>
        </div>
    );
}