import React, { Component } from "react";

export default function Dashboard() {
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
    <div>

            <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
                <div className="container text-center text-md-left" data-aos="fade-up">
                <h1>Welcome to <span>iNFTMaker</span></h1>
                <h2>We are team of talented designers making websites with Bootstrap</h2>
                <a href="#about" className="btn-get-started scrollto">Get Started</a>
                </div>
            </section>

            <main id="main">

                <section id="what-we-do" className="what-we-do">
                <div className="container">

                    <div className="section-title">
                    <h2>What We Do</h2>
                    <p>Magnam dolores commodi suscipit consequatur ex aliquid</p>
                    </div>

                    <div className="row">
                        
                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                            <div className="icon-box"><div className="icon"><i className="bx bxl-dribbble"></i></div>
                                <h4><a href="#">Lorem Ipsum</a></h4>
                                <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                            <div className="icon-box">
                            <div className="icon"><i className="bx bx-file"></i></div>
                            <h4><a href="#">Sed ut perspiciatis</a></h4>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                            <div className="icon-box">
                            <div className="icon"><i className="bx bx-tachometer"></i></div>
                            <h4><a href="#">Magni Dolores</a></h4>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                            </div>
                        </div>

                    </div>

                </div>
                </section>

                <section id="about" className="about">
                <div className="container">

                    <div className="row">
                    <div className="col-lg-6">
                        <img src="website/img/about.jpg" className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0">
                        <h3>About Us</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <ul>
                        <li><i className="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                        <li><i className="bx bx-check-double"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                        </ul>
                        <div className="row icon-boxes">
                        <div className="col-md-6">
                            <i className="bx bx-receipt"></i>
                            <h4>Corporis voluptates sit</h4>
                            <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                        </div>
                        <div className="col-md-6 mt-4 mt-md-0">
                            <i className="bx bx-cube-alt"></i>
                            <h4>Ullamco laboris nisi</h4>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                </section>

                <section id="skills" className="skills">
                <div className="container">

                    <div className="row skills-content">

                    <div className="col-lg-6">

                        <div className="progress">
                        <span className="skill">HTML <i className="val">100%</i></span>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        </div>

                        <div className="progress">
                        <span className="skill">CSS <i className="val">90%</i></span>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        </div>

                        <div className="progress">
                        <span className="skill">JavaScript <i className="val">75%</i></span>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="progress">
                            <span className="skill">PHP <i className="val">80%</i></span>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>

                        <div className="progress">
                        <span className="skill">WordPress/CMS <i className="val">90%</i></span>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        </div>

                        <div className="progress">
                        <span className="skill">Photoshop <i className="val">55%</i></span>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar" role="progressbar" aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        </div>

                    </div>

                    </div>

                </div>
                </section>

                <section id="counts" className="counts">
                <div className="container">

                    <div className="row">

                    <div className="col-lg-3 col-6">
                        <div className="count-box">
                        <i className="bi bi-emoji-smile"></i>
                        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Happy Clients</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">
                        <div className="count-box">
                        <i className="bi bi-journal-richtext"></i>
                        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Projects</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 mt-5 mt-lg-0">
                        <div className="count-box">
                        <i className="bi bi-headset"></i>
                        <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Hours Of Support</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 mt-5 mt-lg-0">
                        <div className="count-box">
                        <i className="bi bi-people"></i>
                        <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Hard Workers</p>
                        </div>
                    </div>

                    </div>

                </div>
                </section>

                <section id="services" className="services section-bg">
                <div className="container">

                    <div className="section-title">
                    <h2>Services</h2>
                    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
                    </div>

                    <div className="row">
                    <div className="col-md-6">
                        <div className="icon-box">
                        <i className="bi bi-briefcase"></i>
                        <h4><a href="#">Lorem Ipsum</a></h4>
                        <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4 mt-lg-0">
                        <div className="icon-box">
                        <i className="bi bi-card-checklist"></i>
                        <h4><a href="#">Dolor Sitema</a></h4>
                        <p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="icon-box">
                        <i className="bi bi-bar-chart"></i>
                        <h4><a href="#">Sed ut perspiciatis</a></h4>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="icon-box">
                        <i className="bi bi-binoculars"></i>
                        <h4><a href="#">Nemo Enim</a></h4>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="icon-box">
                        <i className="bi bi-brightness-high"></i>
                        <h4><a href="#">Magni Dolore</a></h4>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="icon-box">
                        <i className="bi bi-calendar4-week"></i>
                        <h4><a href="#">Eiusmod Tempor</a></h4>
                        <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
                        </div>
                    </div>
                    </div>

                </div>
                </section>

            </main>

    </div>
  );    
}
