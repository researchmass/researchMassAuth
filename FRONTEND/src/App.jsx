import { useState } from "react";
import logo from "./Assets/logo.png"; 

export default function App() {
  const [reg, setReg] = useState("");
  const [passport, setPassport] = useState("");
  const [result, setResult] = useState(null);

  const handleBack = () => {
    window.location.href = "https://researchmass.org/";
  };

  const handleVerify = async () => {
    const cleanReg = reg.trim();
    const cleanPassport = passport.trim();

    if (!cleanReg || !cleanPassport) {
      setResult({ status: "error" });
      return;
    }

    try {
      const res = await fetch(
        `https://https-verify-researchmass-org.onrender.com/users/verify?registrationNumber=${cleanReg}&passportNumber=${cleanPassport}`,
      );

      const data = await res.json();

      if (data.success) {
        setResult({
          status: "success",
          name: data.data.fullName,
          reg: data.data.registrationNumber,
          passport: data.data.passportNumber,
          country: data.data.passportCountry,
        });
      } else {
        setResult({ status: "error" });
      }
    } catch (err) {
      setResult({ status: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="h-42 border-t-1 border-red-500 border-b border-red-300 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-1">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-33 w-auto" />
          </div>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-red-600 hover:bg-red-600 h-11 w-24 text-white px-5 py-2 rounded-full text-sm"
          >
            Back
          </button>
        </div>
      </div>

      {/* Center Card */}
      <div className="flex justify-center items-center py-8 px-4">
        <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-8">
          {/* Title */}
          <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800">
            VERIFY YOUR CONFERENCE <br /> REGISTRATION
          </h1>

          <p className="text-center text-red-600 text-md mt-2">
            Please enter information to verify
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            {/* Registration */}
            <div>
              <label className="text-md font-medium font-bold text-gray-700">
                Registration Number <span className="text-black">* :</span>
              </label>
              <input
                type="text"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                className="w-full mt-1 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Passport */}
            <div>
              <label className="text-md font-medium text-gray-700">
                Passport Number <span className="text-black">* :</span>
              </label>
              <input
                type="text"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                className="w-full mt-1 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center pt-2 ">
              <button
                onClick={handleVerify}
                className="bg-blue-900 hover:bg-blue-1000 text-white px-11 py-4 rounded-md font-semibold cursor-pointer transition duration-300"
              >
                VERIFY
              </button>
            </div>
          </div>

          {/* ✅ SUCCESS RESULT */}
          {result && result.status === "success" && (
            <div className="mt-6 text-center">
              <p>
                <span className="text-green-600 font-semibold">
                  {result.name}{" "}
                </span>
                <span className="text-black font-sm">
                  REGISTRATION HAS BEEN{" "}
                </span>
                <span className="text-black font-sm font-bold">
                  SUCCESSFULLY VARIFIED
                </span>{" "}
                ✅
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full border text-sm">
                  <thead className="bg-red-500 text-white">
                    <tr>
                      <th className="p-2 border">Participant Full Name</th>
                      <th className="p-2 border">Registration No</th>
                      <th className="p-2 border">Passport No</th>
                      <th className="p-2 border">Passport Issuing Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100 text-center">
                      <td className="p-2 border">{result.name}</td>
                      <td className="p-2 border">{result.reg}</td>
                      <td className="p-2 border">{result.passport}</td>
                      <td className="p-2 border">{result.country}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ❌ ERROR */}
          {result && result.status === "error" && (
            <p className="mt-4  text-center font-sm">Not Found</p>
          )}

          {/* Notes */}
          <div className="mt-8 text-sm text-gray-700">
            <h2 className="font-bold text-xl mb-2">Please note that:</h2>

            <ol className="list-decimal text-base pl-5 space-y-2">
              <li>
                You can verify your event registration and invitation letter
                using this form.
              </li>
              <li>
                Do not submit fake or unauthorized invitation letters to the
                Canadian and US embassies when applying for a visa.
              </li>
              <li>
                Every week, we send a list of event registration names and
                invitation letter reference numbers to the Canadian, US
                embassies, and also to Canada IRCC.
              </li>
              <li className="text-red-500 font-medium">
                If you submit a fake or unauthorized invitation letter when you
                apply for a visa, you may be restricted or banned for lifetime
                from entering The Schengen, UK, Australia, Canada and the USA.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
