function Rating({ value, count }) {
  return (
    <div class="rating">
      {value === 1 ? (
        <>
          <i class="icon-smile voted"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>{" "}
        </>
      ) : value === 2 ? (
        <>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>{" "}
        </>
      ) : value === 3 ? (
        <>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>{" "}
        </>
      ) : value === 4 ? (
        <>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile"></i>{" "}
        </>
      ) : value === 5 ? (
        <>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>
          <i class="icon-smile voted"></i>{" "}
        </>
      ) : (
        <>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>
          <i class="icon-smile"></i>{" "}
        </>
      )}

      <small>({count})</small>
    </div>
  );
}

export default Rating;
