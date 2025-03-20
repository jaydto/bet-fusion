export const CategorySkeletonLoader = () => (
    <div className="d-flex overflow-auto px-4 w-100 scrol-cat">
      {Array(4)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-secondary rounded-lg shadow-sm skeleton-category bg-cat-1 "
            style={{
              width: "120px",
              height: "31px",
              marginRight: "3px",
              borderRadius: "3px",
            //   backgroundColor: "#e0e0e0",
            }}
          />
        ))}
    </div>
  );