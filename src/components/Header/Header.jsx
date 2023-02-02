import React from "react";

import styles from "./Header.css";
import Navbar from "./Navbar";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Cellier", href: "/cellar" },
  { name: "Resume", href: "/resume.pdf" },
];

export default function Header() {
  return (
    <div className={"App"}>
      <Navbar></Navbar>
    </div>
  );
}
