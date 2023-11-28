async function redirect(url) {

  try {

    if (!url && url === "") return;

    // set loading state
    $main_container.html(TEMPLATE.loader);

    await $.ajax({
      url,
      method: "GET",
      success: (data) => {

        if (data.status === "error") {
  
          console.log(data);
          redirect("/error");

        } else {

          $main_container.html(data);

        }

      },
      error: (xhr, status, err) => {

        $main_container.html(TEMPLATE.error);
        console.error(status);

      }
    })
    
  } catch (err) {

    $main_container.html(TEMPLATE.error);
    console.error(err);
    
  }
  
}