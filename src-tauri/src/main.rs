// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{command, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
async fn switch_fullscreen(window: Window, is_fullscreen: bool) -> Result<bool, String> {
    println!(
        "I was invoked from JS, with this message: {}",
        is_fullscreen
    );
    window
        .set_fullscreen(!is_fullscreen)
        .map_err(|err| format!("Error toggling fullscreen: {:?}", err))
        .map(|_| !is_fullscreen)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, switch_fullscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
