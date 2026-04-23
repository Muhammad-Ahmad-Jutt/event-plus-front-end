export default function Notfound() {
  return (
    <>
    <style>{`
      .title {
      margin: 0;
      font-size: 90px;
      font-weight: 600;
      color: #969696
      }

      .subtitle {
      margin: 0;
      font-size: 20px;
      font-weight: 200;
      color: #808080;
      }

    `}
    </style>
    <div style={{ textAlign: "center", marginTop: "-20px", marginBottom: "-50px", backgroundColor: '#D3D3D3', paddingTop: '100px', paddingBottom: '100px' }}>
      <h1 className="title">404 - Page Not Found</h1>
      <p className="subtitle">The page you are looking for does not exist.</p>
    </div>
    </>
  );
}