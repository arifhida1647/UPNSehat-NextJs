// pages/index.tsx

export default function Home() {

  return (
    <div className="container min-h-screen">
      <div className="flex flex-col items-center justify-center my-60">
        <p className="text-4xl font-bold">About</p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 items-center justify-center">
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend, purus a vulputate tristique, justo nisi fermentum velit, ut posuere velit purus et turpis. Nulla facilisi. Donec vel urna vel ipsum faucibus imperdiet. Nulla facilisi. Donec vel urna vel ipsum faucibus imperdiet.</p>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend, purus a vulputate tristique, justo nisi fermentum velit, ut posuere velit purus et turpis. Nulla facilisi. Donec vel urna vel ipsum faucibus imperdiet. Nulla facilisi. Donec vel urna vel ipsum faucibus imperdiet.</p>
      </div>
    </div>
  );
}