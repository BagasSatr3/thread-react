// For ECMAScript (ESM)
import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2E4NGRiMWExYjc5MjQwYzUwYTEyNmNmYzhmNTk1MTQwNjI1YmQ4ZTI0NDA4OGE3ODA1OWQwNGY2MzI3MDUxNmU2Zjk3MjU2YWU1MDNiMTQiLCJpYXQiOjE2OTM2MzQ2NzguMTg3NDg4LCJuYmYiOjE2OTM2MzQ2NzguMTg3NDkxLCJleHAiOjQ4NDkzMDgyNzguMTgyNjMzLCJzdWIiOiI2MDcwMTUiLCJzY29wZXMiOltdfQ.pxeZcSNddOy6XjQg6slgLaiTcoOnY23cGg-7UKjXdajJbzjRzojvxrNR8zuRjYaUhByif2dglM9ANzpyzwKbR9McBzrFd6alJA-d0W5Hh7IyPzBR67o8VCJKdnmMpILUmr9cx7BfPasbhxTzuSrPgaPLbnadjA0Wb48YgefRAFM846DAeCcdfnVUfPAQcQw2ivihuj1i5C8va1l_3Q5PaRa_3HykNyR3PsjK2-mIYwC4FD5a18YCZNHvk1BvQntiK992KFP7eGFAn2p4qinxG3f9RGKxAgyGcu_49-RH2POED-sLFQwwomOOtMYJ6VAodSvWnvrdR3N0VjDqCV-w1_ZTNOnz0JEIUOvQ0NsX5uT8MOE8Ospv6oBi-0XXXroWRMtB4XgC0MV-fcAGktUL_Ud-TU3G1Q-i8e6cByOMBJHB7o-aQM954ti265d2SczzuVpZMraLbFBI7UGSwTt9bEDv9wxzCCyqP3YDe9uXPlmvcs-qLDgkM47Jnw3lpFF8E8I6OdEdwbpnN6CRPUdY8ThYUC2iwCatdb1t8_ZRBhQWZqoT5p8P5VG3IJDLNyg8g5kqcXjOm9ehAP7fUd-kr3OGh7ac6OqpIDVdzT47GWYyoyvOXo29khdFRCwg-1NCfR4zKi6WoDcfdmA9vkRQJ8cgdGiV5uSTMtIgXDx-_Qs"
});


export interface GetParams {
    limit?: number;
    page?:  number;
    filter?: {
        name?: "sent" | "draft" | "ready";
    };
    sort: "name" | "total" | "open_rate" | "click_rate" | "created_at" | "-name" | "-total" | "-open_rate" | "-click_rate" | "-created_at";
}

const params: GetParams = {
    limit: 5,
    page: 1,
    sort: "name"
};

mailerlite.groups.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });