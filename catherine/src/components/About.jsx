export default function About() {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div>
          <p className="eyebrow">About Catherine</p>
          <h2 style={{ marginTop: 10, fontSize: 'clamp(26px,3.4vw,36px)' }}>
            Two crafts, one care for detail.
          </h2>
          <p style={{ marginTop: 18 }}>
            Catherine holds a Bachelor of Education in Guidance &amp; Counselling from
            Obafemi Awolowo University, and has spent over twelve years teaching French
            and counselling students across schools in Nigeria and the Republic of Benin
            — from primary classrooms in Cotonou to secondary schools in Ile-Ife.
          </p>
          <p>
            She is DELF B1 certified in French and has guided students through everything
            from language fundamentals to the quieter, more personal work of school
            counselling: orientation, placement, and simply being someone a young person
            can talk to.
          </p>
          <p>
            Alongside teaching, Catherine curates and sources quality fabrics — Ankara,
            lace, and tailoring-ready textiles — for clients building wardrobes, uniforms,
            and occasion wear, bringing the same eye for detail she brings to a French
            conjugation table.
          </p>
        </div>
        <ul className="fact-list">
          <li><span className="fact-label">Education</span><span>B.Ed. Guidance &amp; Counselling, Obafemi Awolowo University (2019)</span></li>
          <li><span className="fact-label">Certification</span><span>DELF B1 — French Language</span></li>
          <li><span className="fact-label">Languages</span><span>English, French — written &amp; spoken translation</span></li>
          <li><span className="fact-label">Based in</span><span>Ile-Ife, Osun State, Nigeria</span></li>
          <li><span className="fact-label">Teaching since</span><span>2012</span></li>
          <li><span className="fact-label">Also skilled in</span><span>Adobe InDesign &amp; Photoshop, MS Office</span></li>
        </ul>
      </div>
    </section>
  )
}
