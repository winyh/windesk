// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{command, Window, WindowEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 全屏切换函数
#[command]
async fn switch_fullscreen(window: Window) -> Result<bool, String> {
    let current_fullscreen = window
        .is_fullscreen()
        .map_err(|err| format!("Error checking fullscreen state: {:?}", err))?;
    let new_fullscreen = !current_fullscreen;
    window
        .set_fullscreen(new_fullscreen)
        .map_err(|err| format!("Error toggling fullscreen: {:?}", err))
        .map(|_| new_fullscreen)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, switch_fullscreen])
        .on_window_event(|event| {
            if let WindowEvent::Resized(_size) = event.event() {
                let is_fullscreen = event.window().is_fullscreen().unwrap_or(false);
                event
                    .window()
                    .emit("fullscreen-changed", is_fullscreen)
                    .unwrap();
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
