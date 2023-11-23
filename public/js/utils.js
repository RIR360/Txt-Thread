async function redirect(url) {

  return $.ajax({
    url,
    method: "GET",
    success: (data) => {

      $main_container.html(data);

    },
    error: (xhr, status, err) => {

      console.error(status);

    }
  })
  
}