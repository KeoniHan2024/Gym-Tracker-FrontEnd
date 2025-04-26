import { useState, useEffect } from "react";
import Header from "../../components/ui/header";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import { FormEvent, InputChangeEvent } from "../../types";
import axios from "axios";
import { convertToSeconds } from "../../utils/helpers";
import CreateSetForm from "../../components/ui/createSetForm";
// import SetsView from "../../components/ui/setsView";

function Sets() {
  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      <div className="sets-grid">
        <CreateSetForm />
      </div>
      {/* <SetsView /> */}
    </>
  );
}

export default Sets;
