import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="footer" className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            &copy;{" "}
            <Link to={"https://www.sonatrach.dz/"} className="textprimary">
              Sonatrach
            </Link>
            , All Right Reserved.
          </div>
          <div className="col-12 col-sm-6 text-center text-sm-end">
            Designed By <Link className="textprimary">Fares</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
