const TIMELINE = [
  {
    year: 'June 2026 — Present',
    title: 'Online French Tutor',
    body: 'Delivering engaging, interactive French instruction through digital platforms. Specializing in custom curriculum design and mobile-optimized lessons to provide an accessible and highly effective language learning experience for students.',
  },
  {
    year: '2022 — Present',
    title: 'French Teacher · Overcomers Glory Point Academy, Ile-Ife',
    body: 'Part-time French instruction, building on a decade of language teaching across school levels.',
  },
  {
    year: '2022 — 2023',
    title: 'Full-Time French Teacher · Sought Out College, Ile-Ife',
    body: 'Led full-time French curriculum delivery for secondary students.',
  },
  {
    year: '2019 — 2022',
    title: 'School Counsellor & French Teacher · St. Mulumba Catholic College, Ile-Ife',
    body: 'Served as school counsellor — placement, orientation, and student support — alongside teaching French.',
  },
  {
    year: '2018 — 2019',
    title: 'French Teacher · Purple Height School, Ile-Ife',
    body: 'Introduced primary school pupils to French and the value of a second language.',
  },
  {
    year: '2012 — 2014',
    title: 'Class Teacher · Gateway International School & Greater Tomorrow International, Cotonou, Benin Republic',
    body: 'Taught core subjects including Basic Science, Mathematics, and English, while mentoring student development.',
  },
  {
    year: '2019',
    title: 'B.Ed. Guidance & Counselling · Obafemi Awolowo University, Ile-Ife',
    body: 'Graduated with a Bachelor of Education, grounding her counselling practice in formal study.',
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Where I've Worked</p>
          <h2>Experience</h2>
        </div>

        <div className="timeline">
          {TIMELINE.map((item) => (
            <div className="tl-item" key={item.title}>
              <span className="tl-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
