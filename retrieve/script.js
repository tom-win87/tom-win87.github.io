"use strict";

//for uuid
document.querySelector(".check0").addEventListener("click", function () {
  const consentUUID = document.querySelector(".consentUUID").value;
  const propertyId0 = document.querySelector(".propId0").value;
  const checker0 =
    fetch(`https://cdn.privacy-mgmt.com/consent/tcfv2/consent/v3/${propertyId0}?consentUUID=${consentUUID}
  `)
      .then((response) => response.json())
      .then(
        (data) =>
          (document.querySelector(".code").textContent = JSON.stringify(
            data,
            null,
            2
          ))
      );
});

//for authid
document.querySelector(".check1").addEventListener("click", function () {
  const authId = document.querySelector(".authId").value;
  const propertyId1 = document.querySelector(".propId1").value;
  const checker1 =
    fetch(`https://cdn.privacy-mgmt.com/consent/tcfv2/consent/v3/${propertyId1}?authId=${authId}
    `)
      .then((response) => response.json())
      .then(
        (data) =>
          (document.querySelector(".code").textContent = JSON.stringify(
            data,
            null,
            2
          ))
      );
});
