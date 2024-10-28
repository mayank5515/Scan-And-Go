const otpValidateTime = async (otpTime) => {
  try {
    //otpTime will be/should be in milliseconds
    const cDateTime = new Date();
    let diff = (otpTime - cDateTime.getTime()) / 1000;
    diff /= 60;
    const minutes = Math.abs(diff);
    console.log("EXPIRED MINUTES: " + minutes);
    if (minutes > 5) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};
module.exports = otpValidateTime;
