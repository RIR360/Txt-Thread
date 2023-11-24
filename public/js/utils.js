async function redirect(url) {

  return $.ajax({
    url,
    method: "GET",
    success: (data) => {

      if (data.status === "error") {

        console.log(data);

      } else {

        $main_container.html(data);

      }

    },
    error: (xhr, status, err) => {

      console.error(status);

    }
  })
  
}