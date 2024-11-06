import './css/Homepage.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import P1 from "../assets/img/homepage/1.png";
import P2 from "../assets/img/homepage/2.png";
import P2girls from "../assets/img/homepage/2girlsAtMac.png";
import P3 from "../assets/img/homepage/3.png";
import P4 from "../assets/img/homepage/4.png";
import P5 from "../assets/img/homepage/5.png";
import P6 from "../assets/img/homepage/6.png";
import P7 from "../assets/img/homepage/7.png";
import dudeAtWhiteboard from "../assets/img/homepage/dudeAtWhiteboard.png";
import Ellipse_groß from "../assets/img/homepage/Ellipse_groß.png";
import Ellipse_klein from "../assets/img/homepage/Ellipse_klein.png";
import gruppenbild_unten from "../assets/img/homepage/gruppenbild_unten.png";
import main_illustration from "../assets/img/homepage/main illustration.png";
import points_horizontal from "../assets/img/homepage/points_horizontal.png";
import avatapurple_background from "../assets/img/homepage/purple_background.png";


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
                    <img className='img_upper' src={main_illustration} alt="person in field" />
                </article>
            </section>
            
            <h2 className='h2_eCommerce'>Lebe eCommerce mal anders</h2>

            <section className="Lebe_eCommerce">
                <article className="article_left">
                <img className='img_article' src={P1} alt="guy sitting at laptop" />
                <img className='img_wierd_left' src={P2} alt="smartphone with website on screen" />
                    <h3 className='h3_article'>Verkaufen statt wegwerfen</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                    </p>
                </article>
                <article className="article_mid">
                    <img className='img_article' src={P3} alt="chair" />
                    <h3 className='h3_article'>Verschenke und Schütze</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                    </p>
                </article>
                <article className="article_right">
                    <img className='img_article' src={P4} alt="forest" />
                    <img className='img_wierd_right_top' src={P7} alt="woman sitting on rock" />
                    <img className='img_wierd_right_mid' src={P6} alt="woman sitting on rock" />
                    <img className='img_wierd_right_bottom' src={P5} alt="woman sitting on rock" />
                    <h3 className='h3_article'>Der Umwelt zuliebe</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                    </p>
                </article>
            </section>

            <section className="purple_section">
                <article className="ohne_limits_purple">
                    <img className='purple_img1' src={P2girls} alt="2 Girls with Mac" />
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
                    <img className='purple_img2' src={dudeAtWhiteboard} alt="Guy at Whiteboard" />
                </article>
            </section>

            <section className="last_Section">
                <h2>Von echten Menschen unterstützt</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.
                </p>
                <img className='img_unten' src=
                    {gruppenbild_unten}
                    alt="gruppenbild" />
            </section>
        </div>
    );
}