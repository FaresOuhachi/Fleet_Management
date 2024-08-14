import { lazy, Suspense } from "react";
import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

//

import Sidebar from "./shared/Sidebar";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

//

import AppRoutes from "./AppRoutes";

//

//
const queryClient = new QueryClient();

class App extends React.Component {
  // const [open, setopen] = useState(true);
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="container-fluid position-relative d-flex p-0">
          <Sidebar />
          <div class="content sidebar-offcanvas">
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
        </div>{" "}
      </QueryClientProvider>
    );
  }
}

export default App;
