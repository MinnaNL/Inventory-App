//src/app > ClientBootstrap

"use client";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ClientBootstrap() {
  useEffect(() => {
    //Dynamic import of Bootstrap Javascript, only running on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}