const Home = () => {
  return (
    <main className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <ul className="services-list">
            <li>Web Development</li>
            <li>Full Stack Learning</li>
            <li>Data Exploration</li>
            <li>Creative Building</li>
          </ul>

          <h1 className="main-headline">
            From Curiosity
            <br />
            To Code
          </h1>
        </div>

        <div className="hero-right">
          <p className="hero-description">
            Hi! I'm Sakshi Dalvi and I like Exploring
            <br /> Front End, Back End and Data Science while <br />
            building projects and learning
            <br /> something new Every Day.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Resume
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
