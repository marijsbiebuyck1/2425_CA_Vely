export default function StationControls({ onLike, onDislike }) {
  return (
    <div className="controls">
      <button onClick={onDislike} className="dislike">
        <img src="/dislikeknop.svg" alt="dislike" />
      </button>
      <button onClick={onLike} className="like">
        <img src="/likeknop.svg" alt="Like" />
      </button>

      <style jsx>{`
        button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          
        }
        .controls {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .like img,
        .dislike img {
          width: 90px;
          height: 120px;
          cursor: pointer;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
          transition: transform 0.2s ease;
        }

        .like img:hover,
        .dislike img:hover {
          transform: scale(1.1);
        }

        .like,
        .dislike {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
