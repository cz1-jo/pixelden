import videos from "@/data/videos.json";

export default function VideoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-2">
        Upcoming{" "}
        <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
          Game Trailers
        </span>
      </h2>
      <p className="text-gray-400 mb-8">Watch the latest reveals and gameplay demos.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-dark-card rounded-xl overflow-hidden border border-white/5 card-hover">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-100">{video.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
