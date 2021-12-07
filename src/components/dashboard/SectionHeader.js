export default function SectionHeader({ user }) {
  return (
    <section
      style={{
        background: `url(http://www.ansonika.com/citytours/img/slide_hero_2.jpg)`,
      }}
    >
      <div class="parallax-content-1">
        <div class="animated fadeInDown">
          <h1>Hello {user.fullName}!</h1>
          <p>Welcome to your dashboard</p>
        </div>
      </div>
    </section>
  );
}
