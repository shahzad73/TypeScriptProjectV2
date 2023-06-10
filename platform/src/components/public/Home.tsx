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
                <h2>Platform Admin login</h2>
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

            </main>

    </div>
  );    
}
