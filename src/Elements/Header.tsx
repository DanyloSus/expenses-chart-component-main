const Header = () => {
  return (
    <header className="flex bg-soft-red w-full rounded-3xl sm:rounded-xl px-10 py-6 items-center">
      <div className="flex flex-col gap-3">
        <p className="font-light">My balance</p>
        <h3 className="font-bold text-3xl">$921.48</h3>
      </div>
      <img src="./logo.svg" alt="logo" className="ml-auto" />
    </header>
  );
};

export default Header;
