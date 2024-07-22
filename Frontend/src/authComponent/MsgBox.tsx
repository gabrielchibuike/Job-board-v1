
function MsgBox() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="w-full max-w-[400px] h-[auto] bg-zinc-200/20 rounded-xl p-8 flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold text-xl text-zinc-600">Verify Your Email </h1>
          <p className="text-center text-sm font-medium text-zinc-500">
            An email containing your reset password token was just sent to your
            email. Click to continue this process.
          </p>
          <div className="w-auto h-auto p-2 px-4  rounded-md text-white text-center text-sm font-semibold cursor-pointer bg-blue-700">
            <a href="https://mail.google.com/mail/u/0/">Procced</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MsgBox