function deleteJob(id) {
  console.log(id);
  const result = confirm("Are you sure you want to delete?");
  if (result) {
    fetch("/deleteJob/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        // console.log("Successfully Deleted");
        window.location.href = "/jobs";
      }
    });
  }
}
