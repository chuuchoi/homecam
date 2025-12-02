import webpush from "web-push";
import type { ActionFunctionArgs } from "react-router";

const vapidKeys = {
  publicKey: "BDX86XqaKKLIAeNhiZTOqEU_07jp1ps3GSZp5cd_8OH1nTfPknCT03nWqJ1rQUQn0kp6LoxrMAKw-CP0RDGfH8I",
  privateKey: "3Y3kkkP_zrTSFnFxRM4d7dTvKTaMW1iePZ2UGS78ATY",
};

webpush.setVapidDetails(
  "mailto:admin@homecam.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function action({ request }: ActionFunctionArgs) {
  const { subscription, title, body } = await request.json();

  await webpush.sendNotification(subscription, JSON.stringify({ title, body }));

  return new Response(JSON.stringify({ ok: true }));
}
