const authenticationActions = {
    "new_user": ["New User", '{\n\t"username": "",\n\t"email": "",\n\t"password": "",\n\t"enabled": "1"\n}'],
    "update_by_username": ["Update by Username", '{\n\t"username": "",\n\t"email": "",\n\t"password": "",\n\t"enabled": "1"\n}'],
    "update_by_email": ["Update by Email", '{\n\t"username": "",\n\t"email": "",\n\t"password": "",\n\t"enabled": "1"\n}'],
    "delete_by_username": ["Delete by Username", '{\n\t"username": ""\n}'],
    "delete_by_email": ["Delete by Email", '{\n\t"email": ""\n}'],
    "get_by_username": ["Get by Username", '{\n\t"username": ""\n}'],
    "get_by_email": ["Get by Email", '{\n\t"email": ""\n}'],
    "enabled_user": ["Enabled User", '{\n\t"username": ""\n}'],
    "disable_user": ["Disable User", '{\n\t"username": ""\n}'],
    "is_user_enabled": ["Is User Enabled", '{\n\t"username": ""\n}'],
    "login_username": ["Log-in Username", '{\n\t"username": "",\n\t"password": ""\n}'],
    "login_email": ["Log-in Email", '{\n\t"username": "",\n\t"password": ""\n}'],
    "fetch_all_users": ["Fetch All Users", '{}']
};

const smsActions = {
    "sms_verification": ["SMS Verification", '{\n\t"recipient": "",\n\t"support": ""\n}'],
    "sms_validate": ["SMS Validate", '{\n\t"recipient": "",\n\t"code": ""\n}'],
    "sms_is_validate": ["SMS Is Validate", '{\n\t"recipient": "",\n\t"code": ""\n}'],
    "fetch_all_otp": ["Fetch All OTP", '{}'],
    "delete_verification": ["Delete Verification", '{\n\t"recipient": "",\n\t"code": ""\n}']
};

const dataAnalyticsActions = {
    "id_create": ["Identify: Create New", "{\n\t\"tracker\": \"\",\n\t\"anon_id\": \"\",\n\t\"user_id\": \"\",\n\t\"timestamp\": \"\",\n\t\"payload\": \"\"\n}"],
    "id_create_live_timestamp": ["Identify: Create with Live Timestamp", "{\n\t\"tracker\": \"\",\n\t\"anon_id\": \"\",\n\t\"user_id\": \"\",\n\t\"payload\": \"\"\n}"],
    "id_delete_by_anon_id": ["Identify: Delete by Anonymous ID", "{\n\t\"tracker\": \"\",\n\t\"anon_id\": \"\"\n}"],
    "id_delete_by_user_id": ["Identify: Delete by User ID", "{\n\t\"tracker\": \"\",\n\t\"user_id\": \"\"\n}"],
    "id_get_by_anon_id": ["Identify: Fetch by Anon ID", "{\n\t\"anon_id\": \"\"\n}"],
    "id_get_by_user_id": ["Identify: Fetch by User ID", "{\n\t\"user_id\": \"\"\n}"],
    "id_get_by_timestamp": ["Identify: Fetch by Timestamp", "{\n\t\"timestamp\": \"\"\n}"],
    "id_fetch_all": ["Identify: Fetch All", "{}"],
};

const addGroupToActions = (name)=> {
    $("#action").append("<option disabled value=\"\">─</option>");
    $("#action").append("<option disabled value=\"\">" + name + "</option>");
};

const addAction = (action, name, args)=>
    $("#action").append(
        "<option value=\"" + action +
        "\" data-args=\"" + btoa(args) +
        "\">" + name + "</option>"
    );

$(document).ready(()=> {
    $("#action").append("<option disabled selected value=\"\">Actions</option>");
    addAction("handshake", "Handshake", "{}");

    addGroupToActions("Authentication");
    for(let act in authenticationActions)
        addAction( act, authenticationActions[act][0], authenticationActions[act][1]);

    addGroupToActions("SMS");
    for(let act in smsActions)
        addAction(act, smsActions[act][0], smsActions[act][1]);

    addGroupToActions("Data Analytics");
    for(let act in dataAnalyticsActions)
        addAction(act, dataAnalyticsActions[act][0], dataAnalyticsActions[act][1]);

    $("#send").click(()=> {
        $.ajax({
            url: "api/index.php?action=" + $("#action").find(":selected").val(),
            type: "POST",
            data: JSON.parse($("#contents").val()),
            headers: JSON.parse($("#http-headers").val()),
            dataType: "json",
            success: (data)=>
                $("#response").val(JSON.stringify(data, null, 4))
        });
    });

    $("#action").on("change", ()=>
        $("#contents").val(atob($("#action").find(":selected").data("args")))
    );
});